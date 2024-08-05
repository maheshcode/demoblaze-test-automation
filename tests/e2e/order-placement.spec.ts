import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/basic/HomePage';
import { ProductPage } from '../../pages/order/ProductPage';
import { CartPage } from '../../pages/order/CartPage';


[
    { category: 'Laptops', searchName: 'Sony', removeName: 'Sony vaio i5' },
    { category: 'Phones', searchName: 'galaxy', removeName: 'Samsung galaxy s6' },
    { category: 'Monitors', searchName: 'Dell', removeName: 'Dell i7 8gb' },
].forEach(({ category, searchName, removeName }) => {
    test('E2E: Place an order for ' + searchName + ' ' + category + ' with new signup user', async ({ page }) => {
        test.setTimeout(60000);
        let userName: string;
        //Sign up the user
        let homePage = new HomePage(page);
        await homePage.goto();
        const signupPage = await homePage.getSignUp();
        userName = Math.random().toString(36).substring(2, 7);
        await signupPage.SignUp(userName, process.env.DEFAULT_PWD!);

        //user login
        let loginPage = await homePage.getLogin();
        await loginPage.Login(userName, process.env.DEFAULT_PWD!);
        //verify the logged in user
        await expect(homePage.getWelcomeLink).toHaveText('Welcome ' + userName);

        // serach for the Sony brand laptops
        await homePage.getCategory(category);
        let product: { name: string, price: string }[] = await homePage.searchProductNameContains(searchName);
        product.forEach(function (value) {
            expect(value.name).toContain(searchName);
        });
        homePage = await homePage.getHome();

        let total: number = 0;
        // Add search item to the cart
        for (let i = 0; i < product.length; ++i) {
            await homePage.selectProduct(category, product[i].name, product[i].price);
            let productPage = new ProductPage(page);
            await productPage.addToCart(i);
            let priceNum = + product[i].price;
            total = total + priceNum;
            homePage = await productPage.getHome();
        }

        // Verify cart items and prices
        await homePage.getCart();
        let cartPage = new CartPage(page);
        await cartPage.checkCartItemCount(product.length);
        await cartPage.checkCartTotal(total.toString());
        for (let i = 0; i < product.length; ++i) {
            await cartPage.checkProdictPriceInCart(product[i].name, product[i].price)
        }

        // Remove cart items
        await cartPage.removeItemFromCart(removeName);
        await cartPage.checkCartItemCount(product.length - 1);
        let removedPrice: number = 0;
        product.forEach(function (value) {
            if (value.name == removeName) {
                removedPrice = +value.price;
            }
        });
        let newTotal: number = total - removedPrice;
        await cartPage.checkCartTotal(newTotal.toString());

        //Place the order & verify success
        await cartPage.placeOrder(userName, process.env.DEFAULT_CC!, newTotal.toString());
    });
});
