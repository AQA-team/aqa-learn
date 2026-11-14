import {Locator, Page} from '@playwright/test'
import { RegisterPage } from './registerPage';

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailField = page.Locator('//*[@id="login-email"]');
        this.passwordField = page.Locator('//*[@id="login-password"]')
        this.loginBtn = page.Locator('//*[@id="login-submit"]');
        this.loginStatus = page.Locator('//*[@id="login-status"]');
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}