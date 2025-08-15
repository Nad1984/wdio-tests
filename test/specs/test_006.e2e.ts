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
});
