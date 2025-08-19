import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data";

describe("Logout", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
  });
  it("Login, click on burger-button and logout", async () => {
    await inventoryPage.checkPageUrl();
    await inventoryPage.clickOnBurgerMenuButton();
    await inventoryPage.clickOnLogoutSidebarLink();
    await loginPage.checkPageUrl();
    await loginPage.checkFieldsAreEmpty();
  });
});
