import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { LoginPage } from '../poms/pages/LoginPage';
import { ProductsPage } from '../poms/pages/ProductsPage';
import { CartPage } from '../poms/pages/CartPage';
import { CheckoutPage } from '../poms/pages/CheckoutPage';
import {CheckoutOverviewPage} from "../poms/pages/CheckoutOverviewPage";
import {CheckoutCompletePage} from "../poms/pages/CheckoutCompletePage";
import dotenv from 'dotenv';

dotenv.config();

test.describe('Checkout tests', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

        const productsPage = new ProductsPage(page);
        await productsPage.addItemToCartByIndex(0);
        await productsPage.goToCart();

        const cartPage = new CartPage(page);
        await cartPage.proceedToCheckout();
    });

    test ('Successful order checkout page', async ({page}) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillForm(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        );
        await checkoutPage.continue();

        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await expect(checkoutOverviewPage.finishButton).toBeVisible();
        await checkoutOverviewPage.finish();

        const completePage = new CheckoutCompletePage(page);
        const header = await completePage.getCompleteHeader();
        expect(header).toBe('Thank you for your order!');

        await completePage.backToHome();
        await expect(page).toHaveURL(/inventory/);
    })

    test ('Continue checkout with empty fields', async ({page}) =>{
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.continue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('First Name is required');
    });

    test('Total price and amount of items check', async ({ page }) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillForm(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.location.zipCode()
        );
        await checkoutPage.continue();

        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        const subtotal = await checkoutOverviewPage.getSubtotal();
        const tax = await checkoutOverviewPage.getTax();
        const total = await checkoutOverviewPage.getTotal();

        expect(subtotal).toContain('$');
        expect(tax).toContain('$');
        expect(total).toContain('$');
        expect(await checkoutOverviewPage.getItemCount()).toBe(1);
    });
})