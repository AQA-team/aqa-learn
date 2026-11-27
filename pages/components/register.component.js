export class RegisterComponent {
  constructor(page) {
    this.page = page;
    this.fullNameField = page.locator('//*[@id="register-name"]');
    this.emailField = page.locator('//*[@id="register-email"]');
    this.passwordField = page.locator('//*[@id="register-password"]');
    this.registerSubmit = page.locator('//*[@id="register-submit"]');
    this.registerStatus = page.locator('//*[@id="register-success"]');
    this.registerBtn = page.locator('#register-btn');
  }

  async startRegister() {
    await this.registerBtn.click();
  }

  async registration(user) {
    await this.fullNameField.fill(user.fullName);
    await this.emailField.fill(user.email);
    await this.passwordField.fill(user.password);
    await this.registerSubmit.click();
  }
}
