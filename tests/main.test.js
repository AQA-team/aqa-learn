import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { LoginComponent } from '../pages/components/login.component';
import { CartComponent } from '../pages/components/cart.component';
import { CheckoutComponent } from '../pages/components/checkout.component';
import { RegisterComponent } from '../pages/components/register.component';

test.describe('Card Payment', () => {
  let mainPage;
  let loginComponent;
  let cartComponent;
  let checkoutComponent;
  let registerComponent;

  test.beforeEach('Authorization', async ({ page }) => {
    mainPage = new MainPage(page);
    loginComponent = new LoginComponent(page);
    cartComponent = new CartComponent(page);
    checkoutComponent = new CheckoutComponent(page);
    registerComponent = new RegisterComponent(page);

    await mainPage.openPage();
    await mainPage.startRegister();
    await registerComponent.registration();
    await expect(registerComponent.registerStatus).toHaveText(
      'Registration successful!'
    );
    await loginComponent.login();
  });

  test('Card payment', async () => {
    await mainPage.addToCart();
    await cartComponent.openCheckout();
    await checkoutComponent.checkout();
    await expect(checkoutComponent.orderModel).toBeHidden({ timeout: 5000 });
  });
});

test.describe('UI-tests for BurgerShop', { tag: ['@ui'] }, () => {
  test('Verify correctness of kcal calculation of the order', async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
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
  });

  test('Add a single item to the cart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const cart = mainPage.cartComponent;

    await mainPage.openPage();
    await expect(mainPage.cartCounter).toHaveText('0');

    const firstCard = mainPage.productList.first();
    const { name, price, calories } =
      await mainPage.getProductDetails(firstCard);

    const addedItem = await mainPage.addItemToTheCart(0);

    await expect(mainPage.cartCounter).toHaveText('1');
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
  });
});
