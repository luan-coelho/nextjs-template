module.exports = {
    extends: [
        'next',
        'next/core-web-vitals',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:tailwindcss/recommended',
        'prettier',
    ],
    plugins: ['prettier', 'react', '@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
}
