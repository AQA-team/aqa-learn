import { BasePage } from "./base.page.js";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);

    this.cards = page.locator(".products-container > .row > .col-md-4");
    this.addButton = this.cards.first().locator(".add-to-cart");
  }

  async open() {
    await super.open("/index.php");
  }

  async addToCart(card) {
    const button = card.locator(".add-to-cart");
    await button.click();
  }

  async getProductDetails(card) {
    return {
      name: await card.locator(".burger-title").innerText(),
      price: await card.locator(".burger-price").innerText(),
      calories: await card.locator(".calorie-badge").innerText(),
    };
  }
}
