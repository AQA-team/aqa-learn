import { BasePage } from './base.page.js';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = page.locator(
      'div.container.products-container > .row > .col-md-4'
    );
  
    this.addButton = page.locator('//*[@class="add-to-cart"]').first();
  } 

    async startRegister() {
      await this.registerBtn.click();
  }

  async startLogin() {
      await this.loginBtn.click();
  }

  async addToCart() {
      await this.addButton.click();
  }

  async openCart() {
      await this.cart.click();
  }

  async addItemToTheCart(itemIndex) {
    if (this.cartComponent.opened) {
      await this.cartComponent.clickCartIcon();
      this.cartComponent.opened = false;
    }

    const productCard = this.productList.nth(itemIndex);
    const itemButton = productCard.locator('button.add-to-cart');
    const productName = await productCard
      .locator('button.add-to-cart')
      .getAttribute('data-name');
    const calories = await productCard
      .locator('button.add-to-cart')
      .getAttribute('data-calories');
    await itemButton.click();
    this.cartComponent.opened = true;
    return { name: productName, calories: +calories };
  }
}
