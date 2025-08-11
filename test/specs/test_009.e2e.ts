import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CartPage from "../pageobjects/cart.page.js";
import { testData } from "../data/test-data.js";

describe("Checkout", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.check_page_url();
  });
  it("Checkout without products", async () => {
    await InventoryPage.click_on_cart();
    await CartPage.check_no_cart_items_on_the_page();
    await CartPage.click_on_checkout_bthn();
    await CartPage.check_error_message_is_present(testData.messages.cart_page_error_message);
  });
});
