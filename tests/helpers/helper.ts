import { Page } from '@playwright/test';
import { LoginPage } from '../pages/logIn.page';
import { InventoryPage } from '../pages/inventory.page';

export class Helper {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly inventoryPage: InventoryPage;

  constructor(page: Page, loginPage: LoginPage, inventoryPage: InventoryPage) {
    this.page = page;
    this.loginPage = loginPage;
    this.inventoryPage = inventoryPage;
  }

  async login(userLogin, userPassword) {
    await this.loginPage.enterUsername(userLogin);
    await this.loginPage.enterPassword(userPassword);
    await this.loginPage.clickLoginButton();
  }  

  async logout() {
    await this.inventoryPage.clickBurgerMenuButton();
    await this.inventoryPage.clickLogoutSidebarLink();
  }  

}