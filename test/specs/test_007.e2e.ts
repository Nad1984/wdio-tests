import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data.js";

describe("Footer", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.check_page_url();
  });
  it("Footer links. The Twitter, Facebook and Linkedin links in the footer should open in a new tab when clicked.", async () => {
    await InventoryPage.check_twitter_link_opens_in_new_window();
    await InventoryPage.click_on_twitter_link_and_return_on_inventory_page();
    await InventoryPage.check_facebook_link_opens_in_new_window();
    await InventoryPage.click_on_facebook_link_and_return_on_inventory_page();
    await InventoryPage.check_linkedin_link_opens_in_new_window();
    await InventoryPage.click_on_linkedin_link_and_return_on_inventory_page();
  });
});
