const eslintConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint', 'import'],

  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
    'plugin:prettier/recommended',
  ],

  rules: {
    'prefer-template': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',

    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],

    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },

  // ESlint default behavior ignores file/folders starting with "." - https://github.com/eslint/eslint/issues/10341
  ignorePatterns: ['!.*', 'dist', 'node_modules'],

  settings: {
    'import/resolver': {
      typescript: { project: 'tsconfig.json' },
    },
  },
};

module.exports = eslintConfig;
