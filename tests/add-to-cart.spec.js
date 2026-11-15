import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage.js";

test.use({ ignoreHTTPSErrors: true });

test(`Add a single item to the cart`, async ({ page }) => {
  const mainPage = new MainPage(page);

  await mainPage.open();

  const cartCntr = mainPage.cartCounter;

  await expect(cartCntr).toHaveText("0");

  const firstCard = mainPage.cards.nth(0);
  const name = await firstCard.locator(".burger-title").innerText();
  const price = await firstCard.locator(".burger-price").innerText();
  const calories = await firstCard.locator(".calorie-badge").innerText();
  const addBtn = await firstCard.locator(".add-to-cart");

  await test.step("1. Add item to the cart", async () => {
    await addBtn.click();

    await expect(cartCntr).toHaveText("1");
  });

  await test.step("2. Open the cart", async () => {
    await mainPage.cartBtn.click();

    await expect(mainPage.cartItems).toHaveCount(1);
  });

  const cartItem = mainPage.cartItems.nth(0);

  await test.step("3. Check item details", async () => {
    await expect(cartItem.locator(".cart-item-title")).toHaveText(name);

    await expect(cartItem.locator(".cart-item-price")).toHaveText(price);

    await expect.soft(cartItem.locator(".calorie-badge")).toHaveText(calories);

    await expect.soft(cartItem.locator(".quantity-value")).toHaveText("1");
  });

  await test.step("4. Check the totals", async () => {
    await expect(mainPage.total).toHaveText(`Total: ${price}`);

    await expect(mainPage.cartCalories).toHaveText(`Calories: ${calories}`);
  });
});
