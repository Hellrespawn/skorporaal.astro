module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['*.js', '*.cjs', '*.html'],
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // These are very useful in the context of writing code for the browser.
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Not sure why devDependencies from package.json aren't allowed.
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // Doesn't work because of bundler.
    'import/no-unresolved': 'off',
    // Doesn't play nice with filenames like feed.controller.ts.
    'import/extensions': ['off'],
    // I like separating normal imports and type imports.
    '@typescript-eslint/consistent-type-imports': 'warn',
    // Not properly configured in base configs.
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    'max-classes-per-file': 'off',

    '@typescript-eslint/restrict-template-expressions': 'off',
  },
};
