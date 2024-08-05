import { expect, type Locator, type Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;
    readonly inputUserName: Locator;
    readonly inputPaswword: Locator;
    readonly btnSignUp: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputUserName = page.getByLabel('Username:');
        this.inputPaswword = page.getByLabel('Password:');
        this.btnSignUp = page.getByRole('button', { name: 'Sign up' });
    }

    async SignUp(userName: string, password: string) {
        await expect(this.btnSignUp).toBeVisible();
        await this.inputUserName.fill(userName);
        await this.inputPaswword.fill(password)
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Sign up successful')
            await dialog.accept();
        });
        await this.page.getByRole('button', { name: 'Sign up' }).click();
        await this.page.waitForTimeout(5000)
    }

}
