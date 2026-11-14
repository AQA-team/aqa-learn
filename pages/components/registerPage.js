import {Locator, Page} from '@playwright/test'

export class RegisterPage {

    constructor(page) {
        this.page = page;
        this.fullNameField = page.Locator('//*[@id="register-name"]');
        this.emailField = page.Locator('//*[@id="register-email"]');
        this.passwordField = page.Locator('//*[@id="register-password"]');
        this.registerBtn = page.Locator('//*[@id="register-submit"]');
        this.registerStatus = page.Locator('//*[@id="register-success"]');
    }

    async registration(fullName="Bogdan", email="test@gmail.com", password="123456") {
        await this.fullNameField.fill(fullname);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.registerBtn.click();
        
    }
}