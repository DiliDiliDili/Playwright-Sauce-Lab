import { add } from 'winston';
import { test, expect } from '../fixtures/MergeFixture';
import logger from '../utils/Logger';
import { faker } from '@faker-js/faker';

const addressDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),}

test.describe('Sauce Labs Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to the login page before each test
    await loginPage.navigateToURL('/');
  });

  test('Verify user can place a order successfully', {
    tag: ['@smoke', '@regression'],
  },async ({ loginPage, loginCredentials, homePage, cartPage, productList, addressPage, confirmationPage }) => {
    const product = faker.helpers.arrayElement(productList.product);
    // Login to the application
    await loginPage.login(loginCredentials.standardUser.username, loginCredentials.standardUser.password);
    // Add product to the cart and verify cart item count
    await homePage.addProductToCart(product.name);
    const getCartItemCount = await homePage.cartItemCount();
    expect(getCartItemCount, 'Verify cart item count is increased by 1').toBe(1);
    logger.info(`Verified: Cart count is increased by 1`);
    // Navigate to the cart and verify product details
    await homePage.navigateToCart();
    await cartPage.assertProductInCart({
      name: product.name,
      price: `${product.price}`,
      description: product.description,
    });
    // Proceed to checkout and add the details
    await cartPage.proceedToCheckout();
    await addressPage.fillAddressForm(addressDetails);
    // Assert total amount in the confirmation page
    await confirmationPage.assertCheckoutSummaryAmount(product.price);
    await confirmationPage.finishOrder();
    // Assert confirmation message
    await confirmationPage.assertConfirmationMessage();
  });

  test('Verify locked user cannot login', {
    tag: ['@smoke', '@regression'], 
  }, async ({ loginPage, loginCredentials }) => {
    // Attempt to login with locked user credentials
    await loginPage.login(loginCredentials.lockedOutUser.username, loginCredentials.lockedOutUser.password);
    // Assert error message is displayed
    await loginPage.assertTextVisibility('Epic sadface: Sorry, this user has been locked out.');
    logger.info('Verified: Locked user cannot login');
  });

  test('Verify problem user can login into application', {
    tag: ['@smoke', '@regression'],
  }, async ({ loginPage, loginCredentials, homePage }) => {
    test.slow();
    // Attempt to login with locked user credentials
    await loginPage.login(loginCredentials.problemUser.username, loginCredentials.problemUser.password);
    // Assert error message is displayed
    await homePage.assertProductsTitle();
    logger.info('Verified: Problem user can login into application');
  });
  
  test('Verify user can login with performance glitch user credentials', {
    tag: ['@smoke', '@regression'],
  }, async ({ loginPage, loginCredentials, homePage }) => {
    test.slow();
    // Attempt to login with standard user credentials
    await loginPage.login(loginCredentials.performanceGlitchUser.username, loginCredentials.performanceGlitchUser.password);
    // Assert products title is visible
    await homePage.assertProductsTitle();
  });
});