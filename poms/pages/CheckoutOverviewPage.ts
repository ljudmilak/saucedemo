import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async getSubtotal(): Promise<string> {
        return (await this.subtotalLabel.textContent()) || '';
    }

    async getTax(): Promise<string> {
        return (await this.taxLabel.textContent()) || '';
    }

    async getTotal(): Promise<string> {
        return (await this.totalLabel.textContent()) || '';
    }

    async getItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async finish() {
        await this.finishButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}