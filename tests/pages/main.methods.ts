import { Locator } from "@playwright/test";
import { Page as PlaywrightPage } from "@playwright/test"

export default class Page {
  public page: PlaywrightPage;

  /**
   * @param {PlaywrightPage} page
   */
  constructor(page: PlaywrightPage) {
    this.page = page;
  }

  async openUrl(path: string) {
    await this.page.goto(path, { waitUntil: "load" });
  }

  async openBaseUrl() {
    await this.openUrl("/");
  }

  async getElement(selector: string) {
    return this.page.locator(selector);
  }

  async getElementsArray(selector: string) {
    return this.page.locator(selector).all();
  }

  async getSelectOptionByValue(locator: Locator, value: string) {
    return locator.selectOption({ value: value });
  }

  async getElementByText(text: string) {
    return this.page.getByText(text, { exact: true });
  }

  async getElementText(locator: Locator) {
    return locator.textContent();
  }

  async clickLocator(locator: Locator) {
    await locator.click();
  }

  async enterText(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async pause(miliseconds: number) {
    await this.page.waitForTimeout(miliseconds);
  }

  async waitForLocator(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }
}
