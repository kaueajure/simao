import { defineConfig } from '@playwright/test';
if (!process.env.E2E_BASE_URL)
  throw new Error('Defina E2E_BASE_URL para o ambiente de homologação.');
if (process.env.E2E_ALLOW_WRITES !== 'homologacao')
  throw new Error('Autorize as escritas de teste com E2E_ALLOW_WRITES=homologacao.');
export default defineConfig({
  testDir: 'tests/e2e-live',
  workers: 1,
  timeout: 120000,
  use: {
    baseURL: process.env.E2E_BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
});
