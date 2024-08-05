import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly inputUserName: Locator;
    readonly inputPaswword: Locator;
    readonly btnLogin: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.inputUserName = page.locator('#loginusername');
        this.inputPaswword = page.locator('#loginpassword');
        this.btnLogin = page.getByRole('button', { name: 'Log in' });
    }

    async Login(userName: string, password: string) {
        await expect(this.btnLogin).toBeVisible();
        await this.inputUserName.fill(userName);
        await this.inputPaswword.fill(password)
        await this.btnLogin.click();
    }

}
