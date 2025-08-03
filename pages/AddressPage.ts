import { Locator, Page, test } from "@playwright/test";
import { BasePage } from "./BasePage";

type AddressDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export class AddressPage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = this.page.getByPlaceholder("First Name").describe("First Name input field");
    this.lastNameInput = this.page.getByPlaceholder("Last Name").describe("Last Name input field");
    this.postalCodeInput = this.page.getByPlaceholder("Postal Code").describe("Postal Code input field");
    this.continueButton = this.page.getByRole("button", { name: "CONTINUE" }).describe("Continue button");
  }

  async fillAddressForm(params: AddressDetails) {
    await test.step(`Fill address form with First Name: ${params.firstName}, Last Name: ${params.lastName}, Postal Code: ${params.postalCode}`, async () => {
      await this.firstNameInput.fill(params.firstName);
      await this.lastNameInput.fill(params.lastName);
      await this.postalCodeInput.fill(params.postalCode);
      await this.continueButton.click();
    });
  }

}