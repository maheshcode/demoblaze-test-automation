import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../basic/BasePage';

export class ProductPage extends BasePage {
    readonly page: Page;
    readonly getProductName: Locator;
    readonly btnAddToCart: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.btnAddToCart = page.getByRole('link', { name: 'Add to cart' })
    }


    async checkProductName(productName: string) {
        await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    }

    async checkProductPrice(productPrice: string) {
        await expect(this.page.getByRole('heading', { name: '$' + productPrice + ' *includes tax' })).toBeVisible();
    }

    async addToCart(index: number) {
        // if(index==0){
        this.page.once('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added.');
            await dialog.accept();
        });
        // }
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
        await this.page.waitForTimeout(5000);
    }







}