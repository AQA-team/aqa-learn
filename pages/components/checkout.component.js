export class CheckoutComponent {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator('//*[@id="name"]');
    this.phoneField = page.locator('//*[@id="phone"]');
    this.addressField = page.locator('//*[@id="address"]');
    this.placeOrderBtn = page.locator('//*[@class="btn btn-primary w-100"]');
    this.deliveryRadioBtn = page.locator('//*[@id="cash"]');
    this.cardRadioBtn = page.locator('//*[@id="card"]');
    this.orderModel = page.locator('//*[@id="order-frame"]');
    this.closeCheckoutBtn = page.locator('//*[@id="order-close"]');
  }

  async closeCheckout() {
    await this.closeCheckoutBtn.click();
  }

  async checkout(info) {
    await this.nameField.fill(info.name);
    await this.phoneField.fill(info.phone);
    await this.addressField.fill(info.address);
    if (info.paymentMethod === 'delivery') {
      await this.deliveryRadioBtn.check();
    } else if (info.paymentMethod === 'card') {
      await this.cardRadioBtn.check();
    }
    await this.placeOrderBtn.click();
  }
}
