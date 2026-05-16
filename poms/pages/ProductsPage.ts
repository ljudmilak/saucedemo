import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }
    async addItemToCartByIndex(index: number) {
        const item = this.inventoryItems.nth(index);
        await item.locator('button[data-test^="add-to-cart"]').click();
    }

    async removeItemFromCartByIndex(index: number) {
        const item = this.inventoryItems.nth(index);
        await item.locator('button[data-test^="remove"]').click();
    }

    async getCartBadgeCount(): Promise<string> {
        return (await this.cartBadge.textContent()) || '0';
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getItemNameByIndex(index: number): Promise<string> {
        const item = this.inventoryItems.nth(index);
        return (await item.locator('[data-test="inventory-item-name"]').textContent()) || '';

    }
}
