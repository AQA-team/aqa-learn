import {test, page} from '@playwright/test'

export class MainPage {

    constructor(page) {
        this.page = page;
        this.loginBtn = page.locator('//*[@id="login-btn"]');
        this.registerBtn = page.locator('//*[@id="register-btn"]');
        this.cart = page.locator('//*[@id="cart-icon"]');
        this.userName = page.locator('//*[@id="user-display-name"]');
        this.addButton = page.locator('//*[@class="add-to-cart"]').first();
        this.checkoutBtn = page.locator('//*[@id="checkout-btn"]');
    } 

    async open() {
        await this.page.goto('https://burgershop-stage.qa-academy.eu/index.php?');
    }

    async startRegister() {
        await this.registerBtn.click();
    }

    async startLogin() {
        await this.loginBtn.click();
    }

    async addToCart() {
        await this.addButton.click();
    }

    async openCart() {
        await this.cart.click();
    }
}