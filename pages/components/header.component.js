export class HeaderComponent {
  constructor(page) {
    this.page = page;

    this.logo = page.getByRole('link', { name: 'Burger Shop' });
    this.home = page.getByRole('link', { name: 'Home' });
    this.contacts = page.getByRole('link', { name: 'Contacts' });
    this.about = page.getByRole('link', { name: 'About Us' });
    this.menuPlanner = page.getByRole('link', { name: 'Menu Planner' });

    this.registerBtn = page.locator('#register-btn');
    this.loginBtn = page.locator('#login-btn');
    this.userInfo = page.locator('#user-info');
  }

  async startLogin() {
    await this.loginBtn.click();
  }

  async startRegister() {
    await this.registerBtn.click();
  }

  async clickLogo() {
    await this.logo.click();
  }

  async openHome() {
    await this.home.click();
  }

  async openContacts() {
    await this.contacts.click();
  }

  async openAbout() {
    await this.about.click();
  }

  async openMenuPlanner() {
    await this.menuPlanner.click();
  }
}
