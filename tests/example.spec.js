import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/components/homePage';
import { LoginPage } from '../pages/components/loginPage';
import { CartPage } from '../pages/components/cartPage';
import { CheckoutPage } from '../pages/components/checkoutPage';
import { RegisterPage } from '../pages/components/registerPage';

test.use({ ignoreHTTPSErrors: true });

test.describe('Card Payment', () => {

  let homePage;
  let loginPage;
  let cartPage;
  let checkoutPage;
  let registerPage;

  test.beforeEach('Authorization', async ({ page }) => {

    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    registerPage = new RegisterPage(page);

    await homePage.open();
    await homePage.startRegister();
    await registerPage.registration();
    await expect(registerPage.registerStatus).toHaveText('Registration successful!');
    await loginPage.login();
    });
  
  test('Card payment', async ({ page }) => {
    await homePage.addToCart();
    //await homePage.openCart();
    await cartPage.openCheckout();
    await checkoutPage.checkout();
    await expect(checkoutPage.orderModel).toBeHidden( { timeout: 5000 });
  });
})
