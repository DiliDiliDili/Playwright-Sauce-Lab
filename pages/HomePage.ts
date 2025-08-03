import { Page, Locator, test } from "@playwright/test";
import { BasePage } from "./BasePage";
import logger from "../utils/Logger";

export class HomePage extends BasePage {
  readonly productsTitle: Locator;
  readonly addToCartButton: Locator;
  readonly checkCartButton: Locator;
  readonly cartIcon: Locator;
  readonly cartCountBadge: Locator;
  readonly productAddToCartButton: (productName: string)=> Locator;

  constructor(page: Page) {
    super(page);
    this.productsTitle = this.page.getByText("Products").describe("Products title");
    this.addToCartButton = this.page.getByRole("button", { name: "ADD TO CART" }).describe("Add to cart button");
    this.cartIcon = this.page.locator('#shopping_cart_container').describe("Cart checkout icon");
    this.cartCountBadge = this.page.locator('.shopping_cart_badge').describe("Cart count badge");
    this.productAddToCartButton = (productName: string) => this.page.locator('div.inventory_item').filter({has: this.page.getByText(productName)}).getByRole('button', {name: 'ADD TO CART'})
    
}
  /**
   * This method asserts that the products title is visible on the page.
   */
  async assertProductsTitle() {
    await this.assertTextVisibility("Products");
  }  

  /**
   * This method adds a product to the cart by clicking the "Add to Cart" button
   * @param productName string
   */
  async addProductToCart(productName: string) {
    await test.step(`Add product ${productName} to cart`, async () => {
      const productButton = this.productAddToCartButton(productName);
      await productButton.click(); 
      logger.info(`Product ${productName} added to cart`);
    });
  }

  /**
   * This method navigates to the cart page.
   */
  async navigateToCart() {
    await test.step("Navigate to Cart", async () => {
      await this.cartIcon.click();
      logger.info("Navigated to cart page");
    });
  }
  
  /**
   * This method return cart item count.
   * @return Promise<number> - The number of items in the cart.
   */
  async cartItemCount(): Promise<number> {
    return await test.step("Get cart item count", async () => {
      const cartCount = await this.cartIcon.textContent();
      return parseInt(cartCount || '0', 10);
    });
  }
}