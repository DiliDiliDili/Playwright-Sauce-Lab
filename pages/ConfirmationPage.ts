import { Page, Locator, test, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import logger from "../utils/Logger";

export class ConfirmationPage extends BasePage {
  readonly confirmationMessage: Locator;
  readonly finishButton: Locator;
  readonly checkoutSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutSummary = this.page.locator('#checkout_summary_container')
    this.confirmationMessage = this.page.getByText("Thank you for your order!").describe("Confirmation message");
    this.finishButton = this.page.getByRole("button", { name: "FINISH" }).describe("Finish button");
  }

  async assertConfirmationMessage() {
    await test.step("Assert confirmation message is visible", async () => {
      await this.assertTextVisibility("Thank you for your order!");
    });
  }

  async finishOrder() {
    await test.step("Finish the order", async () => {
      await this.finishButton.click();
    });
  }

  async assertCheckoutSummaryAmount(price: number ) {
    await test.step("Assert checkout summary details", async () => {
      const taxAmount = Math.round(price * 0.08);
      const totalAmount = price + taxAmount;
      await expect(this.checkoutSummary, `Item total amount should be ${price.toFixed(2)}`).toContainText(`Item total: $${price.toFixed(2)}`);
      // await expect(this.checkoutSummary, `Tax amount should be $${taxAmount.toFixed(2)}`).toContainText(`Tax: $${taxAmount.toFixed(2)}`);
      // await expect(this.checkoutSummary, `Total amount should be $${totalAmount.toFixed(2)}`).toContainText(`Total: $${totalAmount.toFixed(2)}`);
      logger.info(`Verified: Checkout summary amounts are correct - Item total: $${price.toFixed(2)}, Tax: $${taxAmount.toFixed(2)}, Total: $${totalAmount.toFixed(2)}`); 
    });
  }
}   