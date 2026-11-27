import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page.js';
import { SaucesPage } from '../pages/sauces.page.js';
import { qase } from 'playwright-qase-reporter';

test.describe('UI tests for sauces', () => {
  let mainPage;
  let saucesPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    saucesPage = new SaucesPage(page);

    await mainPage.openPage();
    await mainPage.openSaucesSection();
  });

  test(
    'Add 1 item from the sauces category to the cart with an item',
    { tag: ['@sauces'] },
    async () => {
      qase.id(4);
      let item = await saucesPage.addItemToTheCart(0);
      await expect(saucesPage.cartComponent.cartCounter).toHaveText('1');
      await expect(saucesPage.cartComponent.cartSection).toBeVisible();
      let cartItem = saucesPage.cartComponent.getItemDetails(0);
      await expect(await cartItem.name).toHaveText(item.name);
      await expect(await cartItem.price).toHaveText(
        `$${item.price.toFixed(2)}`
      );
      await expect(await cartItem.calories).toHaveText(`${item.calories}`);
    }
  );
});
