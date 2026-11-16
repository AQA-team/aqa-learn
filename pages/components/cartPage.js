import {test, page} from '@playwright/test'

export class CartPage {

  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('//*[@id="checkout-btn"]');
  }

  async openCheckout()  {
    await this.checkoutBtn.click();
  }
}