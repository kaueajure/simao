import { test, expect } from '@playwright/test';
import { context } from './helpers';

const widths = [320, 375, 390, 414, 768, 1024, 1280, 1440];

test('o painel mantém as mesmas dimensões entre páginas sem rolagem do documento', async ({
  browser,
}) => {
  test.setTimeout(120000);
  const ana = await context(browser, 'Ana', 'ana_teste');
  try {
    await ana.page.goto('/pedidos/novo');
    await ana.page
      .getByLabel('O que você está procurando?')
      .fill('Pedido para comparar containers de tamanho fixo');
    await ana.page.getByRole('button', { name: 'Publicar pedido' }).click();
    await ana.page.waitForURL(/\/pedidos\/[a-f0-9-]+$/);
    const request = new URL(ana.page.url()).pathname;
    for (const width of widths) {
      for (const height of [600, 850]) {
        await ana.page.setViewportSize({ width, height });
        let reference: { x: number; y: number; width: number; height: number } | undefined;
        for (const route of [
          '/app',
          '/ranking',
          '/atividades',
          '/perfil',
          '/perfil/ana_teste',
          '/pedidos/novo',
          request,
          request + '/editar',
        ]) {
          await ana.page.goto(route);
          await expect(ana.page.getByRole('heading', { level: 1 })).toBeVisible();
          await expect(ana.page.locator('.app-main')).toBeVisible();
          const bounds = (await ana.page.locator('.app-main').boundingBox())!;
          reference ||= bounds;
          for (const key of ['x', 'y', 'width', 'height'] as const) {
            expect(
              Math.abs(bounds[key] - reference[key]),
              `${route}: ${width}x${height}, ${key}`,
            ).toBeLessThanOrEqual(1);
          }
          const viewport = await ana.page.evaluate(() => ({
            horizontal: document.documentElement.scrollWidth <= innerWidth,
            vertical: document.documentElement.scrollHeight <= innerHeight,
          }));
          expect(viewport.horizontal, route).toBe(true);
          expect(viewport.vertical, route).toBe(true);
          expect(bounds.y + bounds.height).toBeLessThanOrEqual(height - 10);
          await ana.page.evaluate(() => window.scrollTo(0, 10000));
          expect(await ana.page.evaluate(() => scrollY)).toBe(0);
        }
        await ana.page.goto('/app');
        await expect(ana.page.getByRole('heading', { level: 1 })).toBeVisible();
        if (width >= 375 && height === 850) {
          await expect(ana.page.locator('.request-row').first()).toBeInViewport({ ratio: 1 });
        }
        await ana.page.screenshot({
          path: `test-results/container-fixo-${width}x${height}.png`,
          fullPage: true,
        });
      }
    }
  } finally {
    await ana.ctx.close();
  }
});

test('conteúdo extenso continua acessível sem aumentar o painel ou deslocar o cabeçalho', async ({
  browser,
}) => {
  const admin = await context(browser, 'Administrador', 'admin_teste');
  try {
    await admin.page.setViewportSize({ width: 390, height: 600 });
    await admin.page.goto('/perfil');
    const main = (await admin.page.locator('.app-main').boundingBox())!;
    const header = (await admin.page.locator('.app-header').boundingBox())!;
    await admin.page
      .getByRole('button', { name: 'Sair da conta', exact: true })
      .scrollIntoViewIfNeeded();
    await expect(
      admin.page.getByRole('button', { name: 'Sair da conta', exact: true }),
    ).toBeInViewport({ ratio: 1 });
    expect(await admin.page.evaluate(() => scrollY)).toBe(0);
    expect(await admin.page.locator('.app-main').boundingBox()).toEqual(main);
    expect(await admin.page.locator('.app-header').boundingBox()).toEqual(header);
    const city = admin.page.getByRole('combobox', { name: 'Cidade', exact: true });
    await city.fill('Bom Jesus');
    const list = admin.page.getByRole('listbox');
    await expect(list).toBeVisible();
    const options = (await list.boundingBox())!;
    const content = (await admin.page.locator('.app-content').boundingBox())!;
    expect(options.y).toBeGreaterThanOrEqual(content.y);
    expect(options.y + options.height).toBeLessThanOrEqual(content.y + content.height);
    await admin.page.getByRole('option', { name: 'Bom Jesus RS', exact: true }).click();
    await expect(city).toHaveValue('Bom Jesus — RS');
    await admin.page.locator('.mobile-menu summary').click();
    await admin.page
      .locator('.mobile-menu')
      .getByRole('link', { name: 'Início', exact: true })
      .click();
    await expect(admin.page).toHaveURL(/\/app$/);
    await expect(admin.page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await admin.page.locator('.app-content').evaluate((panel) => panel.scrollTop)).toBe(0);
  } finally {
    await admin.ctx.close();
  }
});
