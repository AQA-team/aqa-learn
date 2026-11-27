import { CheckoutComponent } from './checkout.component';

export class CartComponent {
  constructor(page) {
    this.page = page;
    this.opened = false;
    this.cartIcon = page.locator('#cart-icon');
    this.caloriesNearPrice = page.locator('#cart-calories');
    this.total = page.locator('#cart-total');
    this.caloriesBadge = page.locator('.calorie-badge');
    this.checkoutBtn = page.locator('#checkout-btn');
    this.cartItems = page.locator('#cart-items .cart-item');
    this.checkoutComponent = new CheckoutComponent(page);
    this.cartCounter = page.locator('#cart-count');
    this.emptyCaption = page.locator('.empty-cart');
    this.cartSection = page.locator('#cart-overlay');
  }

  async getCaloriesNearPrice() {
    let calories = (await this.caloriesNearPrice.textContent()).replace(
      /[^0-9-]/g,
      ''
    );
    return +calories;
  }

  async getTotalPrice() {
    let price = (await this.total.textContent())
      .replace(',', '.')
      .replace(/[^0-9.-]/g, '');

    return +price;
  }

  async getCaloriesBadge() {
    let calories = (await this.caloriesBadge.textContent()).replace(
      /[^0-9-]/g,
      ''
    );
    return +calories;
  }

  async clickCartIcon() {
    this.opened = !this.opened;
    await this.cartIcon.click();
  }

  async openCheckout() {
    await this.checkoutBtn.click();
  }

  async deleteCartItem(index) {
    const item = this.cartItems.nth(index);
    const deleteBtn = item.locator('.cart-item-remove');
    await deleteBtn.click();
  }

  getItemDetails(index = 0) {
    const item = this.cartItems.nth(index);

    return {
      name: item.locator('.cart-item-title'),
      price: item.locator('.cart-item-price'),
      calories: item.locator('.calorie-badge'),
      quantity: item.locator('.quantity-value'),
    };
  }
}
