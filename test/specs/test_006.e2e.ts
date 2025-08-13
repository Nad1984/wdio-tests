import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data.js";

describe("Products", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
    await inventoryPage.checkPageUrl();
  });
  it("Sorting products by price from low to high", async () => {
    await inventoryPage.selectSortPriceLowToHigh();
    await inventoryPage.getProductPricesCheckIfSortedLowToHigh();
  });
  it("Sorting products by price from high to low", async () => {
    await inventoryPage.selectSortPriceHighToLow();
    await inventoryPage.getProductPricesCheckIfSortedHighToLow();
  });
  it("Sorting products by Name (A to Z)", async () => {
    await inventoryPage.selectSortNameAZ();
    await inventoryPage.getProductNamesCheckIfSortedAZ();
  });
  it("Sorting products by Name (Z to A)", async () => {
    await inventoryPage.selectSortNameZA();
    await inventoryPage.getProductNamesCheckIfSortedZA();
  });
});
