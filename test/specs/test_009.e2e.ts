import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import { testData } from "../data/test-data.js";

describe("Checkout", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
    await inventoryPage.checkPageUrl();
  });
  it("Checkout without products", async () => {
    await inventoryPage.clickOnCart();
    await cartPage.checkNoCartItemsOnThePage();
    await cartPage.clickOnCheckoutBthn();
    await cartPage.checkErrorMessageIsPresent(testData.messages.cartPageErrorMessage);
  });
});
