import { CartComponent } from './components/cart.component.js';
import { LoginComponent } from './components/login.component.js';
import { RegisterComponent } from './components/register.component.js';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator('#user-display-name');
    this.loginComponent = new LoginComponent(page);
    this.registerComponent = new RegisterComponent(page);
    this.cartComponent = new CartComponent(page);
  }

  async openPage(path = '/') {
    await this.page.goto(path);
  }
}
