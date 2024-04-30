import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/logIn.page';
import { InventoryPage } from '../pages/inventory.page';
import { Helper } from '../helpers/helper';
import validCredentials from '../fixed-data/valid_credentials.json';
import invalidCredentials from '../fixed-data/invalid_credentials.json';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let helper: Helper;

test.describe('Login page testing training', () => {
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        helper = new Helper(page, loginPage, inventoryPage);
        await loginPage.gotoLoginPage();
    });

    test('Verify the title', async({page}) => {
        await expect(page).toHaveTitle("Swag Labs");
    });

    test('Verify that all elements are displayed', async() => {
        await expect(await loginPage.getUsernameInput()).toBeVisible();
        await expect(await loginPage.getPasswordInput()).toBeVisible();
        await expect(await loginPage.getLoginLogo()).toBeVisible();
        await expect(await loginPage.getLoginUsernamesSection()).toBeVisible();
        await expect(await loginPage.getLoginPasswordsSection()).toBeVisible();
    });
        
    test('Verify empty user credential fields', async () => {
        await helper.login("", "");
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Username is required");
    });
    
    test('Verify empty username field', async () => {
        await helper.login("", validCredentials[0].password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Username is required");
    });
    
    test('Verify empty password field', async () => {
        await helper.login(validCredentials[0].login, "");
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Password is required");
    });
               
    test('Verify the username is invalid', async () => {
        await helper.login(invalidCredentials[0].login, validCredentials[0].password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });
    
    test('Verify the password is invalid', async () => {
        await helper.login(validCredentials[0].login, invalidCredentials[0].password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });
    
    test('Verify the user credentials are invalid', async () => {
        await helper.login(invalidCredentials[0].login, invalidCredentials[0].password);
        await loginPage.clickLoginButton();
        await expect(await loginPage.getErrorMessageText()).toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).toBeVisible();
        await expect(await loginPage.getErrorMessageText()).toHaveText("Epic sadface: Username and password do not match any user in this service");
    });
    
    test('Verify click the error message close button', async () => {
        await helper.login(invalidCredentials[0].login, invalidCredentials[0].password);
        await loginPage.clickLoginButton();
        await loginPage.clickErrorButton();
        await expect(await loginPage.getErrorMessageText()).not.toBeVisible();
    });
    
    test('Verify the user credentials are valid v1', async ({page}) => {
        await helper.login(validCredentials[0].login, validCredentials[0].password);
        await expect(await loginPage.getErrorMessageText()).not.toBeVisible();
        await expect(await loginPage.getUsernameInputErrorIcon()).not.toBeVisible();
        await expect(await loginPage.getPasswordInputErrorIcon()).not.toBeVisible();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });
    
    test('Verify the user credentials are valid v2', async ({page}) => {
        for(let i = 0; i < validCredentials.length; i++) {
            await helper.login(validCredentials[i].login, validCredentials[i].password);
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
            if(i < validCredentials.length - 1) await helper.logout();
        }
    })
})