import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basic/BasePage';


export class CartPage extends BasePage {
    readonly page: Page;
    readonly getTableRows: Locator;
    readonly btnPlaceOrder: Locator;
    readonly inputName: Locator;
    readonly inputCC: Locator;
    readonly inputCountry: Locator;
    readonly inputCity: Locator;
    readonly inputMonth: Locator;
    readonly inputYear: Locator;
    readonly btnPurchase: Locator;
    readonly msgOrderSuccess: Locator;
    readonly msgOk: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.getTableRows = page.locator('table tbody tr');
        this.btnPlaceOrder = page.getByRole('button', { name: 'Place Order' });
        this.inputName = page.getByLabel('Total:');
        this.inputCC = page.getByLabel('Credit card:');
        this.inputCountry = page.getByLabel('Country:');
        this.inputCity = page.getByLabel('City:');
        this.msgOrderSuccess = page.getByRole('heading', { name: 'Thank you for your purchase!' });
        this.msgOk = page.getByRole('button', { name: 'OK' });
    }

    async checkCartItemCount(itemCount: number) {
        await expect(this.getTableRows).toHaveCount(itemCount);
    }

    async checkCartTotal(itemCount: string) {
        await expect(this.page.getByRole('heading', { name: itemCount })).toBeVisible();
    }

    async removeItemFromCart(productName: string) {
        const responsePromise = this.page.waitForResponse('**/viewcart');
        await this.getTableRows
            .filter({ hasText: productName })
            .locator('text=Delete')
            .click();
        await responsePromise;
    }

    async checkProdictPriceInCart(productName: string, price: string) {
        await expect(this.getTableRows
            .filter({ hasText: productName })
            .locator('text=' + price)).toBeVisible();
    }

    async placeOrder(name: string, creditCard: string, amount: string, country: string = 'SL', city: string = 'Col') {
        await this.btnPlaceOrder.click();
        await expect(this.page.getByText('Total: ' + amount)).toBeVisible();
        await this.inputName.fill(name);
        await this.inputCC.fill(creditCard);
        await this.inputCountry.fill(country);
        await this.inputCity.fill(city);
        await this.page.getByRole('button', { name: 'Purchase' }).scrollIntoViewIfNeeded();
        await this.page.getByRole('button', { name: 'Purchase' }).click();
        await expect(this.msgOrderSuccess).toBeVisible();
        await expect(this.page.getByText('Amount: ' + amount)).toBeVisible();
        await expect(this.page.getByText('Card Number: ' + creditCard)).toBeVisible();
        await expect(this.page.getByText('Name: ' + name)).toBeVisible();
    }


}