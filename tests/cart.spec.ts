import { test, expect } from '@playwright/test';
import { LoginPage } from '../poms/pages/LoginPage';
import { ProductsPage } from '../poms/pages/ProductsPage';
import { CartPage } from '../poms/pages/CartPage';
import dotenv from 'dotenv';

dotenv.config();

const STANDARD_USER = process.env.STANDARD_USER || 'standard_user';
const PASSWORD = process.env.PASSWORD || 'secret_sauce';

test.describe('Cart test cases', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(STANDARD_USER, PASSWORD);
    });

    test('Add one item to card', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);
        await inventoryPage.addItemToCartByIndex(0);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');
    });

    test('Add several item to cart', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);
        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        await inventoryPage.addItemToCartByIndex(2);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('3');
    });

    test('Delete items on products page', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);
        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        await inventoryPage.removeItemFromCartByIndex(0);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe('1');
    });

    test('Delete items on cart page and continue shopping', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);
        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        await inventoryPage.goToCart();

        const cartPage = new CartPage(page);
        expect(await cartPage.getCartItemCount()).toBe(2);

        await cartPage.removeItemByIndex(0);
        expect(await cartPage.getCartItemCount()).toBe(1);

        await cartPage.continueShopping();
        await expect(page).toHaveURL(/inventory/);
    });

    test('Check icon for items in cart', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);

        await inventoryPage.addItemToCartByIndex(0);
        expect(await inventoryPage.getCartBadgeCount()).toBe('1');

        await inventoryPage.addItemToCartByIndex(1);
        expect(await inventoryPage.getCartBadgeCount()).toBe('2');
    });

    test('Go to cart and check the list of added items', async ({ page }) => {
        const inventoryPage = new ProductsPage(page);

        const itemName1 = await inventoryPage.getItemNameByIndex(0);
        const itemName2 = await inventoryPage.getItemNameByIndex(1);

        await inventoryPage.addItemToCartByIndex(0);
        await inventoryPage.addItemToCartByIndex(1);
        await inventoryPage.goToCart();

        const cartPage = new CartPage(page);
        const cartItems = await cartPage.getCartItemNames();

        expect(cartItems).toContain(itemName1);
        expect(cartItems).toContain(itemName2);
        expect(await cartPage.getCartItemCount()).toBe(2);
    });

});