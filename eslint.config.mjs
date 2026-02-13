import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    prettierRecommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                browser: true,
                node: true,
                es2021: true,
            },
        },
        rules: {
            'no-console': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    {
        ignores: ['dist/', 'node_modules/', 'content/', 'backend/docs/'],
    }
);
