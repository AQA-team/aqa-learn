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

  async login(email = 'test@gmail.com', password = '123456') {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginSubmit.click();
  }
}
