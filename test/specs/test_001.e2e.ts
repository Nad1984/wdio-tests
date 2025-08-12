import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data";

describe("Login", () => {
  it("Should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await expect(InventoryPage.logo).toBeExisting();
    await expect(InventoryPage.logo).toHaveText(
      expect.stringContaining(testData.titles.logo)
    );
    await expect(InventoryPage.logo).toMatchElementSnapshot("div.app_logo");
    await InventoryPage.check_page_url();
    await InventoryPage.check_cart_is_displayed();
    await InventoryPage.check_products_on_the_page();
  });
});
