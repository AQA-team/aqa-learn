import { CartComponent } from "./components/cart.component.js";

export class BasePage {
  constructor(page) {
    this.page = page;

    this.loginBtn = page.locator("#login-btn");
    this.registerBtn = page.locator("#register-btn");
    this.userName = page.locator("#user-display-name");

    this.cartCounter = page.locator("#cart-count");
    this.cartIcon = page.locator("#cart-icon");
    this.cartComponent = new CartComponent(page);
  }

  async open(path = "/") {
    await this.page.goto(path);
  }

  async startRegister() {
    await this.registerBtn.click();
  }

  async startLogin() {
    await this.loginBtn.click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}
