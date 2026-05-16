import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.removeButton = page.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }
    async getCartItemNames(): Promise<string[]> {
        const names: string[] = [];
        const count = await this.cartItems.count();
        for (let i = 0; i < count; i++) {
            const name = await this.cartItems.nth(i).locator('[data-test="inventory-item-name"]').textContent();
            if (name) names.push(name);
        }
        return names;
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async removeItemByIndex(index: number) {
        await this.cartItems.nth(index).locator('button[data-test^="remove"]').click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

}