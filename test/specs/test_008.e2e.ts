import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";
import CartPage from "../pageobjects/cart.page.js";
import CheckoutPage from "../pageobjects/checkout.page.js";
import OverviewPage from "../pageobjects/overview.page.js";
import CheckoutCompletePage from "../pageobjects/checkoutComplete.page.js";
import { testData } from "../data/test-data.js";


describe("Checkout", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(testData.user.username, testData.user.password);
    await InventoryPage.check_page_url();
  });
  it("Valid checkout", async () => {
    const [expected_product_name, exp_price] =
      await InventoryPage.add_first_product_to_cart();
    await InventoryPage.check_products_count_in_cart("1");
    await InventoryPage.click_on_cart();
    await CartPage.get_cart_item_value_and_match_with_expected(
      expected_product_name, exp_price
    );
    await CartPage.click_on_checkout_bthn();
    await CheckoutPage.check_information_form_is_visible();
    await CheckoutPage.enter_valid_first_name(testData.user.first_name);
    await CheckoutPage.check_first_name_is_entered(testData.user.first_name);
    await CheckoutPage.enter_valid_last_name(testData.user.last_name);
    await CheckoutPage.check_last_name_is_entered(testData.user.last_name);
    await CheckoutPage.enter_valid_zip_code(testData.user.zip);
    await CheckoutPage.check_zip_is_entered(testData.user.zip);
    await CheckoutPage.click_continue_bthn();
    await OverviewPage.get_product_name_and_compare_with_expected(
      expected_product_name
    );
    await OverviewPage.get_product_price_and_compare_with_expected(exp_price);
    await OverviewPage.get_product_price_and_compare_with_subtotal(exp_price);
    await OverviewPage.click_on_finish_bthn();
    await CheckoutCompletePage.check_page_name();
    await CheckoutCompletePage.check_success_message(testData.messages.checkout_success_message);
    await CheckoutCompletePage.click_on_back_home_bthn();
    await InventoryPage.check_page_url();
    await InventoryPage.check_cart_is_displayed();
    await InventoryPage.check_products_on_the_page();
    await InventoryPage.check_cart_is_empty();
  });
});
