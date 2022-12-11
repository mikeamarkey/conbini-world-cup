/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  ignorePatterns: ['.cache', 'functions', 'node_modules', 'public/build'],
  overrides: [
    {
      files: ['"**/*.ts?(x)'],
      extends: '@remix-run/eslint-config',
      rules: {
        '@typescript-eslint/no-unnecessary-condition': 'error',
      },
    },
  ],
};
