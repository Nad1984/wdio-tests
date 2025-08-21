import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data.js";

describe("Products", () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.loginUser(testData.user.userName, testData.user.password);
  });
  it("Sorting products by price from low to high", async () => {
    await inventoryPage.sortPriceLowToHighCheckIfSorted();
  });
  it("Sorting products by price from high to low", async () => {
    await inventoryPage.SortPriceHighToLowCheckIfSorted();
  });
  it("Sorting products by Name (A to Z)", async () => {
    await inventoryPage.sortProductNameAZCheckIfSorted();
  });
  it("Sorting products by Name (Z to A)", async () => {
    await inventoryPage.sortProductNamesZACheckIfSorted();
  });
  it("Alternative sorting test where one method is used"),
    async () => {
      await inventoryPage.sortAndCheckIfSorted(
        testData.products.sortProductByNameAZ,
        inventoryPage.productNames,
        false,
        "asc"
      );
      await inventoryPage.sortAndCheckIfSorted(
        testData.products.sortProductByNameZA,
        inventoryPage.productNames,
        false,
        "desc"
      );
      await inventoryPage.sortAndCheckIfSorted(
        testData.products.sortProductByNameAZ,
        inventoryPage.productPrices,
        true,
        "asc"
      );
      await inventoryPage.sortAndCheckIfSorted(
        testData.products.sortProductByNameZA,
        inventoryPage.productPrices,
        true,
        "desc"
      );
    };
});
