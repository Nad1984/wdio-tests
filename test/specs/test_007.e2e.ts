import loginPage from "../pageobjects/login.page.js";
import inventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data.js";

describe("Footer", () => {
  before(async () => {
    await loginPage.open();
    await loginPage.login(testData.user.userName, testData.user.password);
  });
  it("Footer links. The Twitter, Facebook and Linkedin links in the footer should open in a new tab when clicked.", async () => {
    await inventoryPage.clickOnTwitterLinkAndReturnOnInventoryPage();
    await inventoryPage.clickOnFacebookLinkAndReturnOnInventoryPage();
    await inventoryPage.clickOnLinkedinLinkAndReturnOnInventoryPage();
  });
});
