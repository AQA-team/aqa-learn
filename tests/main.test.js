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

  test('Checking the card payment', { tag: ['@payment'] }, async () => {
    qase.id(11);
    await mainPage.addToCart();
    await mainPage.cartComponent.openCheckout();
    await mainPage.cartComponent.checkoutComponent.checkout();
    await expect(
      mainPage.cartComponent.checkoutComponent.orderModel
    ).toBeHidden();
  });

  test('Close checkout page', { tag: ['@closeCheckout'] }, async () => {
    qase.id(9);
    await mainPage.addToCart();
    await mainPage.cartComponent.openCheckout();
    await mainPage.cartComponent.checkoutComponent.checkout();
    await expect(
      mainPage.cartComponent.checkoutComponent.closeCheckoutBtn
    ).toHaveRole('button');
    await mainPage.cartComponent.checkoutComponent.closeCheckout();
    await expect(
      mainPage.cartComponent.checkoutComponent.orderModel
    ).toBeHidden();
  });
});

test.describe('Login', () => {
  let mainPage;

  test.beforeEach('Registration', async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openPage();
    await mainPage.registerComponent.startRegister();
    await mainPage.registerComponent.registration();
    await expect(mainPage.registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
  });

  test('Login', { tag: ['@login'] }, async ({ page }) => {
    qase.id(8);
    mainPage = new MainPage(page);
    await mainPage.loginComponent.login();
    await expect(mainPage.userName).toHaveText('Bogdan');
  });

  test(
    'Login with invalid credentials',
    { tag: ['@loginInvalid'] },
    async ({ page }) => {
      qase.id(19);
      mainPage = new MainPage(page);
      await mainPage.loginComponent.login(undefined, 'wrongpassword');
      await expect(mainPage.loginComponent.loginStatus).toHaveText(
        'Invalid email or password'
      );
    }
  );
});

test.describe('Registration', () => {
  let mainPage;

  test('Registration', { tag: ['@registration'] }, async ({ page }) => {
    qase.id(10);
    mainPage = new MainPage(page);
    await mainPage.openPage();
    await mainPage.registerComponent.startRegister();
    await mainPage.registerComponent.registration();
    await expect(mainPage.registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
  });
});

test.describe('UI-tests for BurgerShop', { tag: ['@ui'] }, () => {
  let mainPage;

  test(
    'Verify correctness of kcal calculation of the order',
    { tag: ['@calories'] },
    async ({ page }) => {
      qase.id(7);
      mainPage = new MainPage(page);
      let totalCalories = 0;
      await mainPage.openPage();
      const item1 = await mainPage.addItemToTheCart(0);
      totalCalories += item1.calories;
      const item2 = await mainPage.addItemToTheCart(1);
      totalCalories += item2.calories;
      const item3 = await mainPage.addItemToTheCart(2);
      totalCalories += item3.calories;
      expect(await mainPage.cartComponent.getCaloriesNearPrice()).toEqual(
        totalCalories
      );
      expect(await mainPage.cartComponent.getCaloriesBadge()).toEqual(
        await mainPage.cartComponent.getCaloriesNearPrice()
      );
    }
  );

  test(
    'Add a single item to the cart',
    { tag: ['@addingItem'] },
    async ({ page }) => {
      qase.id(1);
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
