import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ProductPage } from '../order/ProductPage';

export class HomePage extends BasePage {
    readonly page: Page;
    readonly getNextLink: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.getNextLink = page.locator('#next2');
    }

    async getCategory(categoryName: string) {
        let getCategories: Locator = this.page.getByRole('link', { name: categoryName });
        //Wait for network request to full fill to make sure only 'notebook' category to load
        const responsePromise = this.page.waitForResponse('**/bycat');
        await getCategories.click();
        await responsePromise;
    }

    async searchProductNameContains(productName: string) {
        //var items: string[] = [];
        let items: { name: string, price: string }[] = [];
        let searchFinished: boolean = false;
        while (!searchFinished) {
            let eleList: Locator = await this.page.locator('a', { hasText: productName });
            let count = await eleList.count();
            for (let index = 0; index < count; ++index) {
                let itemName: string = await eleList.nth(index).textContent() ?? "Not Found";
                let itemPrice: string = await eleList.nth(index).locator('../../h5').textContent() ?? '0.00';
                let newItem = {
                    name: itemName.trim(),
                    price: itemPrice.trim().substring(1)
                };

                items.push(newItem);
            }
            if (await this.getNextLink.isVisible()) {
                const responsePromise = this.page.waitForResponse('**/pagination');
                this.getNextLink.click();
                await responsePromise;
            } else {
                searchFinished = true;
            }
        };
        return items;

    }

    async selectProduct(categoryName: string, productName: string, productPrice: string) {
        await this.getCategory(categoryName);
        let searchFinished: boolean = false;
        while (!searchFinished) {
            if (await this.page.locator('a', { hasText: productName }).first().isVisible()) {
                await this.page.locator('a', { hasText: productName }).first().click();
                let productPage: ProductPage = new ProductPage(this.page);
                await productPage.checkProductName(productName);
                await productPage.checkProductPrice(productPrice);
                break;
            }
            if (await this.getNextLink.isVisible()) {
                const responsePromise = this.page.waitForResponse('**/pagination');
                this.getNextLink.click();
                await responsePromise;
            } else {
                searchFinished = true;
            }
        };

    }
}