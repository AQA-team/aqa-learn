import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';

export default [
  // Базовые правила для всего JavaScript-кода
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
  },

  // Правила конкретно для файлов с тестами Playwright
  {
    files: ['tests/**/*.spec.js', 'tests/**/*.test.js'], // проверьте путь к вашим тестам
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Дополнительно усиливаем критичные проверки:
      'playwright/missing-playwright-await': 'error',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-focused-test': 'error',
      'playwright/no-page-pause': 'error',
    },
  },
];