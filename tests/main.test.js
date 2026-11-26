import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { qase } from 'playwright-qase-reporter';

test.describe('Card Payment', () => {
  let mainPage;

  test.beforeEach('Authorization', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openPage();
    await mainPage.registerComponent.startRegister();
    await mainPage.registerComponent.registration();
    await expect(mainPage.registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
    await mainPage.loginComponent.login();
  });

  test( qase(11, 'Checking the card payment'), { tag: ['@payment'] }, async () => {
    await mainPage.addToCart();
    await mainPage.cartComponent.openCheckout();
    await mainPage.cartComponent.checkoutComponent.checkout();
    await expect(
      mainPage.cartComponent.checkoutComponent.orderModel
    ).toBeHidden();
  });
});

test.describe('UI-tests for BurgerShop', { tag: ['@ui'] }, () => {
  let mainPage;
  test(
    qase(7, 'Verify correctness of kcal calculation of the order'),
    { tag: ['@calories'] },
    async ({ page }) => {
      mainPage = new MainPage(page);
      let totalCalories = 0;
      await mainPage.openPage();
      const item1 = await mainPage.addItemToTheCart(0);
      totalCalories += item1.calories;
      const item2 = await mainPage.addItemToTheCart(1);
      totalCalories += item2.calories;
      const item3 = await mainPage.addItemToTheCart(2);
      totalCalories += item3.calories;
      await expect(await mainPage.cartComponent.getCaloriesNearPrice()).toEqual(
        totalCalories
      );
      await expect(await mainPage.cartComponent.getCaloriesBadge()).toEqual(
        await mainPage.cartComponent.getCaloriesNearPrice()
      );
    }
  );

  test(
    qase(1, 'Add a single item to the cart'),
    { tag: ['@addingItem'] },
    async ({ page }) => {
      mainPage = new MainPage(page);
      const cart = mainPage.cartComponent;

      await mainPage.openPage();
      await expect(cart.cartCounter).toHaveText('0');

      const firstCard = mainPage.productList.first();
      const { name, price, calories } =
        await mainPage.getProductDetails(firstCard);

      const addedItem = await mainPage.addItemToTheCart(0);

      await expect(cart.cartCounter).toHaveText('1');
      await expect(cart.cartItems).toHaveCount(1);

      const item = cart.getItemDetails();

      await expect(item.name).toBeVisible();
      await expect(item.name).toHaveText(name);
      await expect(item.price).toHaveText(price);
      await expect(item.calories).toHaveText(calories);
      await expect(item.quantity).toHaveText('1');

      await expect
        .poll(() => cart.getCaloriesNearPrice())
        .toBe(addedItem.calories);

      await expect.poll(() => cart.getTotalPrice()).toBe(price);
    }
  );
});
