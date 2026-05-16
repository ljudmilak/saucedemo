import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async getCompleteHeader(): Promise<string> {
        return (await this.completeHeader.textContent()) || '';
    }

    async backToHome() {
        await this.backHomeButton.click();
    }
}