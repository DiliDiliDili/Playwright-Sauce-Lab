import { expect, test, Page, Locator } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly textLocator: (text: string, flag?: boolean) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.textLocator = (text: string, flag = true) => this.page.getByText(text, { exact: flag }).describe(`Text: ${text}`);
  }

  async navigateToURL(URL: string) {
    await test.step(`Navigate to ${URL}`, async () => {
      await this.page.goto(URL, { waitUntil: "domcontentloaded" });
    });
  }

  async assertPageTitle(expectedTitle: string) {
    await test.step(`Verify page title is display as ${expectedTitle}`, async () => {
      const title = await this.page.title();
      expect(title, `Verify page title is display as ${title}`).toContain(
        expectedTitle
      );
    });
  }

  async assertTextVisibility(text: string) {
    await test.step(`Verify ${text} is displayed in UI`, async () => {
      const locator = this.page.getByText(text, { exact: true });
      await expect(locator, `Verify ${text} is displayed in UI`).toBeVisible();
    });
  }
}
