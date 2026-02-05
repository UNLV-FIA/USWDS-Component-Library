import js from '@eslint/js';
import css from '@eslint/css';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.angular/**'],
  },
  {
    files: ['**/*.{css,scss}'],
    plugins: {css},
    extends: ['css/recommended'],
    languageOptions: { globals: globals.browser},
    language: "css/css",
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.angular/**'],
  },
  tseslint.configs.recommended,
]);
