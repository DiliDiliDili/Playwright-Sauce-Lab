import { Page, Locator, test } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByPlaceholder("Username").describe("Username input field");
    this.passwordInput = this.page.getByPlaceholder("Password").describe("Password input field");
    this.loginButton = this.page.getByRole("button", { name: "LOGIN" }).describe("Login button");
  }
  
  /**
   * This method logs in to the application using the provided username and password.
   * @param username string
   * @param password string
   */
  async login(username: string, password: string) {
    await test.step(`Login with username: ${username}`, async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    });
  }
}
