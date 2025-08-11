import LoginPage from "../pageobjects/login.page.js";
import InventoryPage from "../pageobjects/inventory.page.js";

describe("Products", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("standard_user", "secret_sauce");
    await InventoryPage.check_page_url();
  });
  it("Sorting products by price from low to high", async () => {
    await InventoryPage.select_sort_price_low_to_high();
    await InventoryPage.get_product_prices_check_if_sorted_low_to_high();
  });
  it("Sorting products by price from high to low", async () => {
    await InventoryPage.select_sort_price_high_to_low()
    await InventoryPage.get_product_prices_check_if_sorted_high_to_low()
  });
  it("Sorting products by Name (A to Z)", async () => {
    await InventoryPage.select_sort_name_A_Z()
    await InventoryPage.get_product_names_check_if_sorted_A_Z()
  });
  it("Sorting products by Name (Z to A)", async () => {
    await InventoryPage.select_sort_name_Z_A()
    await InventoryPage.get_product_names_check_if_sorted_Z_A()
    await InventoryPage.sleep();
  });
});
