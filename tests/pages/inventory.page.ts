import Page from './main.methods';

const burgerMenuButton = '#react-burger-menu-btn';
const logoutSidebarLink = '#logout_sidebar_link';

export class InventoryPage extends Page {
    constructor(page: Page['page']) {
        super(page);
    }

    async getBurgerMenuButton() {
        return await super.getElement(burgerMenuButton);
    }

    async getLogoutSidebarLink() {
        return await super.getElement(logoutSidebarLink);
    }

    async clickBurgerMenuButton() {
        await super.clickLocator(await this.getBurgerMenuButton());
    }

    async clickLogoutSidebarLink() {
        await super.clickLocator(await this.getLogoutSidebarLink());
    }
}