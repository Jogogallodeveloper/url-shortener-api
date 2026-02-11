module.exports = {
  root: true,

  // English comment: ESLint should not attempt to lint config/build artifacts.
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.cjs',
    '*.js',
    'eslint.config.*',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },

  plugins: ['@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
      env: { jest: true },
    },
  ],
};
