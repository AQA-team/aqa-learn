import { CartComponent } from './components/cart.component.js';

export class BasePage {
  constructor(page) {
    this.page = page;

    this.cartComponent = new CartComponent(page);
  }

  async openPage(path = '/') {
    await this.page.goto(path);
  }
}
