import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import checkoutPage from "../pageobjects/checkout.page.js";
import overviewPage from "../pageobjects/overview.page.js";
import checkoutCompletePage from "../pageobjects/checkoutComplete.page.js";
import { testData } from "../data/test-data.js";


describe("Checkout", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
    await inventoryPage.checkPageUrl();
  });
  it("Valid checkout", async () => {
    const [expectedProductName, expPrice] =
      await inventoryPage.addFirstProductToCart();
    await inventoryPage.checkProductsCountInCart("1");
    await inventoryPage.clickOnCart();
    await cartPage.checkCartItemValueMatchesWithExpected(
      expectedProductName, expPrice
    );
    await cartPage.clickOnCheckoutBthn();
    await checkoutPage.checkInformationFormIsVisible();
    await checkoutPage.enterValidFirstName(testData.user.firstName);
    await checkoutPage.enterValidLastName(testData.user.lastName);
    await checkoutPage.enterValidZipCode(testData.user.zip);
    await checkoutPage.clickContinueBthn();
    await overviewPage.getProductNameAndCompareWithExpected(
      expectedProductName
    );
    await overviewPage.getProductPriceAndCompareWithExpected(expPrice);
    await overviewPage.getProductPriceAndCompareWithSubtotal(expPrice);
    await overviewPage.clickOnFinishBthn();
    await checkoutCompletePage.checkPageName();
    await checkoutCompletePage.checkSuccessMessage(testData.messages.checkoutSuccessMessage);
    await checkoutCompletePage.clickOnBackHomeBthn();
    await inventoryPage.checkPageUrl();
    await inventoryPage.checkCartIsDisplayed();
    await inventoryPage.checkProductsOnThePage();
    await inventoryPage.checkCartIsEmpty();
  });
});
