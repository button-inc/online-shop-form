module.exports = {
  extends: ['airbnb-base', 'prettier', 'prettier/react', 'plugin:cypress/recommended'],
  env: { es6: true, browser: true, node: true },
  plugins: [],
  parserOptions: {
    project: './jsconfig.json',
  },
  parser: 'babel-eslint',
  root: true,
  rules: {
    camelcase: 0,
    'no-unused-vars': 0,
    'arrow-body-style': 0,
    'import/no-unresolved': 0,
    'no-console': 0,
    'no-shadow': 0,
    'no-path-concat': 0,
    'import/no-extraneous-dependencies': 0,
    'prefer-arrow-callback': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'prefer-spread': 0,
    'prefer-rest-params': 0,
    'object-shorthand': 0,
    'max-classes-per-file': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'class-methods-use-this': 0,
    'lines-between-class-members': 0,
    'no-plusplus': 0,
    'import/no-dynamic-require': 0,
    'new-cap': 0,
    'prefer-template': 0,
    'no-fallthrough': 0,
  },
  overrides: [],
};
