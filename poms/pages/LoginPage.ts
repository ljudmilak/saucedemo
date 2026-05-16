import { Locator, Page} from "@playwright/test";
import process from "process";

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly error: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.error = page.locator('[data-test="error"]');
    }

    async goto (): Promise<void> {
        await this.page.goto(process.env.BASE_URL!);
    }

    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.error.textContent()) || '';
    }
}