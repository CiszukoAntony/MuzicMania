module.exports = {
    env: {
        browser: True,
        es2021: True,
        node: True,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-console': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
    },
};
