export class BasePage {
    url = '';

    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator('//*[@id="login-btn"]');
        this.registerBtn = page.locator('//*[@id="register-btn"]');
        this.cart = page.locator('//*[@id="cart-icon"]');
        this.userName = page.locator('//*[@id="user-display-name"]');

    }

    async open(url = this.url) {
        await this.page.goto(url);
    }

}