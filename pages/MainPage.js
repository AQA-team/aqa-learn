export class MainPage {
  constructor(page) {
    this.page = page;

    this.registerBtn = page.locator("#register-btn");
    this.cards = page.locator(".products-container > .row > .col-md-4");
    this.cartBtn = page.locator("#cart-icon");
    this.cartCounter = page.locator("#cart-count");
    this.cartItems = page.locator("#cart-items .cart-item");

    this.total = page.locator("#cart-total");
    this.cartCalories = page.locator("#cart-calories");
  }

  async open() {
    await this.page.goto("https://burgershop-stage.qa-academy.eu/index.php");
  }
}
