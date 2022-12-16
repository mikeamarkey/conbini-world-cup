/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-hudochenkov/order',
    'stylelint-config-prettier',
  ],
  rules: {
    'selector-class-pattern': /^[a-z][a-zA-Z0-9_-]+$/,
  },
};
