import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
            'import/named': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/prefer-default-export': 'off',
            'import/no-cycle': 'off',
            'import/no-default-export': 'off',
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'],
                        ['internal', 'parent', 'sibling', 'index'],
                    ],
                    pathGroups: [
                        {pattern: 'assets/**', group: 'sibling', position: 'after'},
                        {
                            pattern: '@external/**/*.css',
                            group: 'sibling',
                            position: 'after',
                        },
                        {
                            pattern: '*.css',
                            group: 'index',
                            patternOptions: {matchBase: true},
                            position: 'after',
                        },
                        {
                            pattern: '*.scss',
                            group: 'index',
                            patternOptions: {matchBase: true},
                            position: 'after',
                        },
                    ],
                    warnOnUnassignedImports: true,
                    pathGroupsExcludedImportTypes: ['css'],
                    'newlines-between': 'always',
                },
            ],
        },
    },
);
