export class LoginComponent {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('//*[@id="login-email"]');
    this.passwordField = page.locator('//*[@id="login-password"]');
    this.loginSubmit = page.locator('//*[@id="login-submit"]');
    this.loginStatus = page.locator('//*[@id="login-status"]');
    this.authContainer = page.locator('//*[@class="auth-container"]');
    this.loginBtn = page.locator('#login-btn');
  }

  async startLogin() {
    await this.loginBtn.click();
  }

  async login(user) {
    await this.emailField.fill(user.email);
    await this.passwordField.fill(user.password);
    await this.loginSubmit.click();
  }
}
