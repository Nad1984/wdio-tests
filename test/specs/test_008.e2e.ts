import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import cartPage from "../pageobjects/cart.page.js";
import checkoutPage from "../pageobjects/checkout.page.js";
import overviewPage from "../pageobjects/overview.page.js";
import checkoutCompletePage from "../pageobjects/checkoutComplete.page.js";
import { testData } from "../data/test-data.js";
import { faker } from "@faker-js/faker";

describe("Checkout", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.loginUser(testData.user.userName, testData.user.password);
  });
  it("Valid checkout", async () => {
    await inventoryPage.checkPageUrl();
    const [expectedProductName, expPrice] =
      await inventoryPage.addFirstProductToCartAndCheckIfAdded(
        testData.products.expectedProductsCountInCart
      );
    await inventoryPage.clickOnCart();
    await cartPage.checkCartItemValueMatchesWithExpected(
      expectedProductName,
      expPrice
    );
    await cartPage.clickOnCheckoutBthn();
    await checkoutPage.checkInformationFormIsVisible();
    await checkoutPage.enterValidFirstName(faker.person.firstName());
    await checkoutPage.enterValidLastName(faker.person.lastName());
    await checkoutPage.enterValidZipCode(faker.location.zipCode());
    await checkoutPage.clickContinueBthn();
    await overviewPage.getProductNameAndCompareWithExpected(
      expectedProductName
    );
    await overviewPage.getProductPriceAndCompareWithExpected(expPrice);
    await overviewPage.getProductPriceAndCompareWithSubtotal(expPrice);
    await overviewPage.clickOnFinishBthn();
    await checkoutCompletePage.checkPageName();
    await checkoutCompletePage.checkSuccessMessage(
      testData.messages.checkoutSuccessMessage
    );
    await checkoutCompletePage.clickOnBackHomeBthn();
    await inventoryPage.checkUserOnInventoryPage();
  });
});
