/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:storybook/recommended'
  ],
  root: true,
  rules: {
    /**
     * @/features/index.ts からBarrel exportされたもののみを外部で使用可能とするルール
     * 参考： https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md
     */
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/features/*/*']
      }
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index'
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc'
        }
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports'
      }
    ],
    '@typescript-eslint/no-unused-vars': [0, { argsIgnorePattern: '^_' }]
  }
}
