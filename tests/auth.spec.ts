import { test, expect } from '@playwright/test';
import { LoginPage } from '../poms/pages/LoginPage';
import dotenv from 'dotenv';

dotenv.config();

test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

    await expect(page).toHaveURL(/inventory/);
});

test('Invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match any user in this service');
});

test('Empty username field', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', process.env.PASSWORD!);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
});

test('Empty password field', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.STANDARD_USER!, '');

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
});

test('Locked out user login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(process.env.LOCKED_OUT_USER!, process.env.PASSWORD!);

    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
});
