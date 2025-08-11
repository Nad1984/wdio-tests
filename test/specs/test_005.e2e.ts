import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CartPage from "../pageobjects/cart.page.js";
import { testData } from "../data/test-data";


describe("Cart", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.check_page_url();
  });
  it("Add any product to cart, logout, login and check that product is still in the cart", async () => {
    const [expected_product_name, exp_price] =
      await InventoryPage.add_first_product_to_cart();
    await InventoryPage.check_products_count_in_cart("1");
    await InventoryPage.click_on_cart();
    await CartPage.get_cart_item_value_and_match_with_expected(
      expected_product_name, exp_price
    );
    await InventoryPage.click_on_burger_menu_button();
    await InventoryPage.check_burger_menu_is_visible();
    await InventoryPage.check_burger_menu_items_count();
    await InventoryPage.click_on_logout_sidebar_link();
    await LoginPage.check_page_url();
    await LoginPage.check_fields_are_empty();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.click_on_cart();
    await CartPage.get_cart_item_value_and_match_with_expected(
      expected_product_name, exp_price
    );
  });
});
