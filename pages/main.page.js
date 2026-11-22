import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.pizzaSectionBtn = page.locator('a[href="/pages/pizza.php"]');
  }

  async openPizzaSection() {
    await this.pizzaSectionBtn.click();
  }
}
