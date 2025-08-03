import { test as baseTest, expect } from '@playwright/test';
import { AddressPage } from '../pages/AddressPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { LoginPage } from '../pages/LoginPage';

type UIPages = {
    addressPage: AddressPage;
    cartPage: CartPage;
    homePage: HomePage;
    confirmationPage: ConfirmationPage;
    loginPage: LoginPage;
}

export const test = baseTest.extend<UIPages>({
    addressPage: async ({ page }, use) => {
        await use(new AddressPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    confirmationPage: async ({ page }, use) => {
        await use(new ConfirmationPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});