/* Returns array of dependencies in format [..., {ownerPropertyName: dependantPropertyName}] */
export function getPropertyDependencies(dependencies) {
  const propertyDependencies = [];
  Object.entries(dependencies).forEach(([ownerProperty, value]) => {
    if (value.oneOf) {
      value.oneOf.forEach(scenario => {
        if (scenario.required) {
          propertyDependencies.push({ [ownerProperty]: scenario.required[0] });
        }
      });
    }
  });
  return propertyDependencies;
}

// Returns array of dependant properties
function getDependantProperties(propertyDependencies) {
  const dependantProperties = [];
  propertyDependencies.forEach(dependencyRelation => {
    dependantProperties.push(Object.values(dependencyRelation)[0]);
  });
  return dependantProperties;
}

// Returns array of all nested fields in object fields.
function getNestedFieldProperties(properties) {
  const nestedFields = [];
  Object.entries(properties).forEach(([ownerProperty, value]) => {
    if (value.type === 'object') {
      Object.keys(value.properties).forEach(fieldName => {
        nestedFields.push(fieldName);
      });
    }
  });
  return nestedFields;
}
/* splitSchema is built to handle only dependencies of the form
{
  propertyName: {
    oneOf: [
      {
        properties: {...},
      },
      {
        properties: {...}, <-- property lists match
        required: [] <-- Only one requirement
      },
    ]
  }
}
i.e, properties that only toggle a single requirement.
This is the format that easily supports non-js environments.
For more complex dependencies this should not be used. */
export default function splitSchema(schema, order) {
  const schemas = [];
  const { properties, dependencies, required, title, type } = schema;
  const propertyDependencies = getPropertyDependencies(dependencies);
  const dependantProperties = getDependantProperties(propertyDependencies);
  const nestedFieldProperties = getNestedFieldProperties(properties);
  order.forEach(propertyName => {
    // Dependant properties will be included in the schema of property they depend on
    // and can be skipped
    if (dependantProperties.includes(propertyName)) return;

    // Nested fields error on properties[propertyName] since they aren't directly in it.
    // In our case, we handle them in the next if statement
    if (nestedFieldProperties.includes(propertyName)) return;

    // Costs is a nested field that is basically a "mini schema" so to speak.
    // In order for the ui:field to be applied, we need { costs: properties[costs]}
    // as opposed to newSchema = properties['costs']
    if (properties[propertyName].type === 'object') {
      const newSchema = {
        properties: {
          [propertyName]: properties[propertyName],
        },
      };
      schemas.push(newSchema);
    } else {
      const newSchema = { title, type, properties: {}, required: [], dependencies: {} };

      // copy property
      newSchema.properties[propertyName] = properties[propertyName];

      // Add required
      if (required.includes(propertyName)) {
        newSchema.required.push(propertyName);
      }

      // Check for dependency. Add dependant properties and dependency to current schema
      const dependancyRelation = propertyDependencies.filter(
        dependant => Object.keys(dependant)[0] === propertyName
      )[0];
      const dependancy = dependancyRelation && dependancyRelation[propertyName];
      if (dependancy) {
        newSchema.properties[dependancy] = properties[dependancy];
        newSchema.dependencies[propertyName] = dependencies[propertyName];
      }

      // Add to schema list
      schemas.push(newSchema);
    }
  });

  return schemas;
}
