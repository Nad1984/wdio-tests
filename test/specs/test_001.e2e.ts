import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data";

describe("Login", () => {
  it("Should login with valid credentials", async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
    await expect(inventoryPage.logo).toBeExisting();
    await expect(inventoryPage.logo).toHaveText(
      expect.stringContaining(testData.titles.logo)
    );
    await expect(inventoryPage.logo).toMatchElementSnapshot("div.app_logo");
    await inventoryPage.checkPageUrl();
    await inventoryPage.checkCartIsDisplayed();
    await inventoryPage.checkProductsOnThePage();
  });
});
