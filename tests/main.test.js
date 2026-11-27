import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page.js';
import { UserFactory } from './factories/user.factory';
import { qase } from 'playwright-qase-reporter';
import CheckoutBuilder from './builders/checkoutBuilder.js';

test.describe('Card Payment', () => {
  let mainPage;
  let user;

  test.beforeEach('Authorization', async ({ page }) => {
    mainPage = new MainPage(page);
    user = UserFactory.createUser();

    await mainPage.openPage();
    await mainPage.registerComponent.startRegister();
    await mainPage.registerComponent.registration(user);
    await expect(mainPage.registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
    await mainPage.loginComponent.login(user);
  });

  test('Checking the card payment', { tag: ['@paymentCard'] }, async () => {
    qase.id(11);
    let userInfo = new CheckoutBuilder().withPaymentMethod('card').build();
    await mainPage.addToCart();
    await mainPage.cartComponent.openCheckout();
    await mainPage.cartComponent.checkoutComponent.checkout(userInfo);
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
  let user;
  let wrongUser;

  test.beforeEach('Registration', async ({ page }) => {
    mainPage = new MainPage(page);
    user = UserFactory.createUser(); // Генерируем пользователя для тестов логина

    await mainPage.openPage();
    await mainPage.registerComponent.startRegister();
    await mainPage.registerComponent.registration(user); // Передаем user
    await expect(mainPage.registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
  });

  test('Login', { tag: ['@login'] }, async () => {
    qase.id(8);
    await mainPage.loginComponent.login(user);
    await expect(mainPage.userName).toHaveText(user.fullName);
  });

  test(
    'Login with invalid credentials',
    { tag: ['@loginInvalid'] },
    async () => {
      qase.id(19);
      wrongUser = UserFactory.createUserWithWrongPassword();
      await mainPage.loginComponent.login(wrongUser);
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

  test('Checkout empty cart', { tag: ['@emptyCheckout'] }, async ({ page }) => {
    qase.id(6);
    mainPage = new MainPage(page);
    page.on('dialog', async (dialog) => {
      const message = dialog.message();
      await dialog.accept();
      expect(message).toContain('Cart is empty!');
    });

    await mainPage.cartComponent.clickCartIcon();
    await mainPage.cartComponent.openCheckout();
  });

  test(
    'Place an order for delivery items from the cart, payment on delivery',
    { tag: ['@paymentDelivery'] },
    async ({ page }) => {
      qase.id(3);
      mainPage = new MainPage(page);
      let userInfo = new CheckoutBuilder()
        .withPaymentMethod('delivery')
        .build();
      await mainPage.addToCart();
      await mainPage.cartComponent.openCheckout();
      await mainPage.cartComponent.checkoutComponent.checkout(userInfo);
      await expect(
        mainPage.cartComponent.checkoutComponent.orderModel
      ).toBeHidden();
    }
  );
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
    "Delete all items from the cart by button 'x' near each position",
    { tag: ['@deletingItem'] },
    async ({ page }) => {
      qase.id(5);
      mainPage = new MainPage(page);
      const cart = mainPage.cartComponent;
      await mainPage.openPage();
      await mainPage.addItemToTheCart(0);
      await mainPage.addItemToTheCart(1);
      await mainPage.addItemToTheCart(2);
      const itemArray = await Promise.all(
        [
          cart.getItemDetails(0),
          cart.getItemDetails(1),
          cart.getItemDetails(2),
        ].map(async (item) => ({
          name: await item.name.textContent(),
          price: await item.price.textContent(),
        }))
      );
      let checkArray;
      let checkPrice = 0;

      await cart.deleteCartItem(0);
      itemArray.shift();
      checkArray = await Promise.all(
        [cart.getItemDetails(0), cart.getItemDetails(1)].map(async (item) => ({
          name: await item.name.textContent(),
          price: await item.price.textContent(),
        }))
      );
      let totalPrice = await cart.getTotalPrice();
      for (let item of checkArray) {
        checkPrice += +item.price.replace(',', '.').replace(/[^0-9.-]/g, '');
      }
      await expect(cart.cartCounter).toHaveText('2');
      expect(itemArray).toEqual(checkArray);
      expect(totalPrice).toEqual(checkPrice);

      await cart.deleteCartItem(0);
      itemArray.shift();
      checkArray = await Promise.all(
        [cart.getItemDetails(0)].map(async (item) => ({
          name: await item.name.textContent(),
          price: await item.price.textContent(),
        }))
      );
      totalPrice = await cart.getTotalPrice();
      checkPrice = 0;
      for (let item of checkArray) {
        checkPrice += +item.price.replace(',', '.').replace(/[^0-9.-]/g, '');
      }
      await expect(cart.cartCounter).toHaveText('1');
      expect(itemArray).toEqual(expect.arrayContaining(checkArray));
      expect(totalPrice).toEqual(checkPrice);

      await cart.deleteCartItem(0);
      itemArray.shift();
      totalPrice = await cart.getTotalPrice();
      await expect(cart.cartCounter).toHaveText('0');
      expect(itemArray).toEqual([]);
      await expect(cart.emptyCaption).toHaveText('Your cart is empty');
      expect(totalPrice).toEqual(0);
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
