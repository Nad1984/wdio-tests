import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data";

describe("Login", () => {
  it("Should login with valid credentials", async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
    await inventoryPage.checkUserOnInventoryPage();
  });
});
