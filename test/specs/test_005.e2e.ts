import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import { testData } from "../data/test-data";

describe("Cart", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.loginUser(testData.user.userName, testData.user.password);
  });
  it("Add any product to cart, logout, login and check that product is still in the cart", async () => {
    await inventoryPage.checkPageUrl();
    const [expectedProductName, expectedPrice] =
      await inventoryPage.addFirstProductToCartAndCheckIfAdded(
        testData.products.expectedProductsCountInCart
      );

    await inventoryPage.clickOnCart();
    await cartPage.checkCartItemValueMatchesWithExpected(
      expectedProductName,
      expectedPrice
    );
    await inventoryPage.clickOnBurgerMenuButton();
    await inventoryPage.clickOnLogoutSidebarLink();
    await loginPage.checkPageUrl();
    await loginPage.checkFieldsAreEmpty();
    await loginPage.login(testData.user.userName, testData.user.password);
    await inventoryPage.clickOnCart();
    await cartPage.checkCartItemValueMatchesWithExpected(
      expectedProductName,
      expectedPrice
    );
  });
});
