import { Page, Locator, test, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import logger from '../utils/Logger';

export type ProductDetails = {
  name: string;
  price: string;
  description: string;
}

export class CartPage extends BasePage {
  private checkoutButton: Locator;
  private continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = this.page.getByRole('button', { name: 'CHECKOUT' }).describe('Checkout button');
    this.continueShoppingButton = this.page.getByRole('button', { name: 'CONTINUE SHOPPING' }).describe('Continue Shopping button');
  }

  async proceedToCheckout() {
    await test.step('Proceed to Checkout', async () => {
      await this.checkoutButton.click();
    });
  }

  async continueShopping() {
    await test.step('Continue Shopping', async () => {
      await this.continueShoppingButton.click();
    });
  }

  async assertProductInCart(productName: ProductDetails) {
    await test.step(`Assert product ${productName.name} is in cart`, async () => {
      const productLocator = this.textLocator(productName.name);
      await expect(productLocator, `Verify product ${productName.name} is in the cart`).toBeVisible();
      logger.info(`Verified: Product ${productName.name} is present in the cart`);
      const priceLocator = this.textLocator(`$${productName.price}`);
      await expect(priceLocator, `Verify product price $${productName.price} is displayed`).toBeVisible();
      logger.info(`Verified: Product price ${productName.price} is displayed in the cart`);
      const descriptionLocator = this.textLocator(productName.description);
      await expect(descriptionLocator, `Verify product description ${productName.description} is displayed`).toBeVisible();
      logger.info(`Verified: Product description ${productName.description} is displayed in the cart`);
    });

  }
}   