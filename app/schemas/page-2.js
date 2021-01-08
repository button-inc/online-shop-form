import ObjectFieldTemplate from 'components/form/ObjectFieldTemplate';

const TEXT_MIN_LENGTH = 1;
const TEXT_MAX_LENGTH = 1000;

const schema2 = {
  title: 'Example Form',
  type: 'object',
  required: [
    'cannabisProducts',
    'madeInBc',
    'employees',
    'importExportBusiness',
    'existingOnlineStore',
    'canMeetDeadline',
    'otherCovidFunding',
    'sector',
    // GRANT PROPOSAL SECTION
    'planForFunds',
    'serviceProviders',
    'customerAcquisition',
    'staffTraining',
  ],
  dependencies: {
    madeInBc: {
      oneOf: [
        {
          properties: {
            madeInBc: { enum: [true] },
          },
        },
        {
          properties: {
            madeInBc: { enum: [false] },
            // not the best name here, but like sector maybe we consolidate to one field? discuss
            productionLocation: {
              type: 'string',
              title: 'Where',
              name: 'productionLocation',
              minLength: TEXT_MIN_LENGTH,
              maxLength: TEXT_MAX_LENGTH,
            },
          },
          required: ['productionLocation'],
        },
      ],
    },
    existingOnlineStore: {
      oneOf: [
        {
          properties: {
            existingOnlineStore: { enum: [false] },
          },
        },
        {
          properties: {
            existingOnlineStore: { enum: [true] },
            onlineStoreUrl: {
              type: 'string',
              title: 'Link to online store',
              name: 'onlineStoreUrl',
              minLength: TEXT_MIN_LENGTH,
              maxLength: TEXT_MAX_LENGTH,
            },
            // For these to show up as checkboxes, we need to include "ui:widget": "checkboxes" in uiSchema.
            existingStoreFeatures: {
              type: 'string',
              enum: [
                'Customer registration and information security features',
                'Shopping cart and order management capabilities',
                'Payment processing options including application of appropriate taxes and shipping costs at time of ordering',
                'Product catalogue, search and inventory status',
                'Website analytics and reporting capabilities',
              ],
            },
          },
          required: ['onlineStoreUrl', 'existingStoreFeatures'],
        },
      ],
    },
    otherCovidFunding: {
      oneOf: [
        {
          properties: {
            otherCovidFunding: { enum: [false] },
          },
        },
        {
          properties: {
            otherCovidFunding: { enum: [true] },
            otherPrograms: {
              type: 'string',
              title: 'WorkSafeBC registration number',
              name: 'otherPrograms',
              minLength: TEXT_MIN_LENGTH,
              maxLength: TEXT_MAX_LENGTH,
            },
          },
          required: ['otherPrograms'],
        },
      ],
    },
  },
  properties: {
    cannabisProducts: {
      type: 'boolean',
      title: 'Does your business sell Cannabis products?',
      default: false,
      name: 'cannabisProducts',
      isRequired: true,
    },
    // Has a condition
    madeInBc: {
      type: 'boolean',
      title: 'Are your products manufactured and/or produced in BC?',
      default: false,
      name: 'madeInBc',
      isRequired: true,
    },
    employees: {
      type: 'string',
      name: 'employees',
      title: 'How many employees does the business have on its payroll?',
      enum: ['None', '1-9', '10-49', '50-99', '100-149', '150-199', '200 or more'],
      // default: '',
      isRequired: true,
    },
    importExportBusiness: {
      type: 'boolean',
      title: 'Is the business an import/export business?',
      default: false,
      name: 'importExportBusiness',
      isRequired: true,
    },
    // Has condition, plus a second condition not done yet
    existingOnlineStore: {
      type: 'boolean',
      title: 'Does the business currently have an online store?',
      default: false,
      name: 'existingOnlineStore',
      isRequired: true,
    },
    canMeetDeadline: {
      type: 'boolean',
      title:
        'If approved, are you able to utilize the grant funds and complete your online store proposal in twelve weeks?',
      default: false,
      name: 'canMeetDeadline',
      isRequired: true,
    },
    // Has condition
    otherCovidFunding: {
      type: 'boolean',
      title: 'Has your business received funding from other provincial or federal COVID-19 recovery programs?',
      default: false,
      name: 'otherCovidFunding',
      isRequired: true,
    },

    // GRANT PROPOSAL SECTION
    planForFunds: {
      type: 'string',
      title: 'Indicate how you plan to use the funds.',
      name: 'planForFunds',
      minLength: TEXT_MIN_LENGTH,
      maxLength: TEXT_MAX_LENGTH,
    },
    // The following arrays also have a field that is just a calculated 75% of the total cost.
    // I don't think we necessarily need them in here, we can just add the fields to the view when created.
    // That way we dont have a bunchof extra fields on the form, that don't require user input.
    serviceProviders: {
      type: 'array',
      title: 'Service Provider(s)',
      items: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
            title: 'Service provider',
            name: 'provider',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
          serviceCost: {
            type: 'string',
            title: 'Cost of service',
            name: 'serviceCost',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
        },
        dependencies: ['provider', 'serviceCost'],
      },
      isRequired: true,
    },
    customerAcquisition: {
      type: 'array',
      title: 'Digital Customer Acquisition',
      items: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
            title: 'Service provider',
            name: 'provider',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
          serviceCost: {
            type: 'string',
            title: 'Cost of service',
            name: 'serviceCost',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
        },
        dependencies: ['provider', 'serviceCost'],
      },
    },
    staffTraining: {
      type: 'array',
      title: 'Staff Training Costs',
      items: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
            title: 'Service provider',
            name: 'provider',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
          serviceCost: {
            type: 'string',
            title: 'Cost of service',
            name: 'serviceCost',
            minLength: TEXT_MIN_LENGTH,
            maxLength: TEXT_MAX_LENGTH,
          },
        },
        dependencies: ['provider', 'serviceCost'],
      },
      isRequired: true,
    },
  },
  ObjectFieldTemplate,
};

export default schema2;
