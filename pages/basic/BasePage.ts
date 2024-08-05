import { expect, type Locator, type Page } from '@playwright/test';
import { SignupPage } from './SignupPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

export class BasePage {
    readonly page: Page;
    readonly url:string;
    readonly getStorLogo: Locator;
    readonly getSignUpLink: Locator;
    readonly getLoginLink: Locator;
    readonly getWelcomeLink: Locator;
    readonly getHomeLink: Locator;
    readonly getCartLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.getStorLogo = page.getByRole('link', { name: 'PRODUCT STORE' });
        this.getSignUpLink = page.getByRole('link', { name: 'Sign up' });
        this.getLoginLink = page.getByRole('link', { name: 'Log in' })
        this.getWelcomeLink = page.locator('a', { hasText: 'WelCome' });
        this.getHomeLink = page.locator('a', { hasText: 'Home' });
        this.getCartLink = page.locator('a', { hasText: 'Cart' });
        this.url = process.env.URL?? 'https://www.demoblaze.com/index.html';
    }

    async goto() {
        await this.page.goto(this.url);
        await expect(this.getStorLogo).toBeVisible();
    }

    async getHome() {
        const responsePromise = this.page.waitForResponse('**/entries');
        await this.getHomeLink.click();
        await responsePromise;
        return new HomePage(this.page);
    }

    async getCart() {
        const responsePromise = this.page.waitForResponse('**/viewcart');
        await this.getCartLink.click();
        await responsePromise;
    }

    async getSignUp() {
        await this.getSignUpLink.click();
        return new SignupPage(this.page);
    }

    async getLogin() {
        await this.getLoginLink.click();
        return new LoginPage(this.page);
    }

}