import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import { testData } from "../data/test-data";

const user = "standard_user";
const pass = "secret_sauce";

describe("Logout", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.check_page_url();
  });
  it("Login, click on burger-button and logout", async () => {
    await InventoryPage.click_on_burger_menu_button();
    await InventoryPage.check_burger_menu_is_visible();
    await InventoryPage.check_burger_menu_items_count();
    await InventoryPage.click_on_logout_sidebar_link();
    await LoginPage.check_page_url();
    await LoginPage.check_fields_are_empty();
  });
});
