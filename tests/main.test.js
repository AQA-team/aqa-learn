import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page.js";

test.describe("UI-tests for BurgerShop", { tag: ["@ui"] }, () => {
  test("Add a single item to the cart", async ({ page }) => {
    const mainPage = new MainPage(page);
    const cart = mainPage.cartComponent;

    await mainPage.open();
    await expect(mainPage.cartCounter).toHaveText("0");

    const firstCard = mainPage.cards.first();
    const { name, price, calories } = await mainPage.getProductDetails(firstCard);

    await mainPage.addToCart(firstCard);
    await expect(mainPage.cartCounter).toHaveText("1");

    await mainPage.openCart();
    await expect(cart.cartItems).toHaveCount(1);

    const item = cart.getItemDetails();

    await expect(item.name).toHaveText(name);
    await expect(item.price).toHaveText(price);
    await expect(item.calories).toHaveText(calories);
    await expect(item.quantity).toHaveText("1");

    await expect(cart.total).toHaveText(`Total: ${price}`);
    await expect(cart.cartCalories).toHaveText(`Calories: ${calories}`);
  });
});
