import { BasePage } from './base.page.js';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);

    this.productList = page.locator(
      'div.container.products-container > .row > .col-md-4'
    );
    this.addButton = page.locator('//*[@class="add-to-cart"]').first();
  }

  async addToCart() {
    await this.addButton.click();
  }

  async getProductDetails(card) {
    return {
      name: await card.locator('.burger-title').innerText(),
      price: await card.locator('.burger-price').innerText(),
      calories: await card.locator('.calorie-badge').innerText(),
    };
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
