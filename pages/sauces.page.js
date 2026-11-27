import { BasePage } from './base.page.js';

export class SaucesPage extends BasePage {
  constructor(page) {
    super(page);
    this.productList = page.locator(
      'div.container.products-container > .row > .col-md-4'
    );
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
    const price = await productCard
      .locator('button.add-to-cart')
      .getAttribute('data-price');
    await itemButton.click();
    this.cartComponent.opened = true;
    return { name: productName, calories: +calories, price: +price };
  }
}
