import Page from './main.methods';

const usernameInput = '#user-name';
const passwordInput = '#password';
const loginLogo = '.login_logo';
const loginButton = '#login-button';
const loginUsernames = '#login_credentials';
const loginPasswords = '.login_password';
const errorMessageText = '.error-message-container.error > h3';
const errorButton = '.error-button';
const usernameInputErrorLogo = usernameInput+'~svg';
const passwordInputErrorLogo = passwordInput+'~svg';

export class LoginPage extends Page {
    constructor(page: Page['page']) {
        super(page);
    }

    async gotoLoginPage() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async getUsernameInput() {
        return await super.getElement(usernameInput);
    }

    async getPasswordInput() {
        return await super.getElement(passwordInput);
    }

    async getLoginLogo() {
        return await super.getElement(loginLogo);
    }

    async getLoginButton() {
        return await super.getElement(loginButton);
    }

    async getLoginUsernamesSection() {
        return await super.getElement(loginUsernames);
    }

    async getLoginPasswordsSection() {
        return await super.getElement(loginPasswords);
    }

    async getErrorButton() {
        return await super.getElement(errorButton);
    }

    async getUsernameInputErrorIcon() {
        return await super.getElement(usernameInputErrorLogo);
    }

    async getPasswordInputErrorIcon() {
        return await super.getElement(passwordInputErrorLogo);
    }

    async getErrorMessageText() {
        return await super.getElement(errorMessageText);
    }

    async getErrorMessageContent() {
        return await super.getElementText(await this.getErrorMessageText());
    }

    async enterUsername(email) {
        return await super.enterText(await this.getUsernameInput(), email);
    }

    async enterPassword(password) {
        return await super.enterText(await this.getPasswordInput(), password);
    }
    async clickLoginButton() {
        await super.clickLocator(await this.getLoginButton());
    }
    
    async clickErrorButton() {
        await super.clickLocator(await this.getErrorButton());
    }
}


    