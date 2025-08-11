import { $ } from "@wdio/globals";
import Page from "./page.js";

class CartPage extends Page {
  public get cart() {
    return $("a.shopping_cart_link");
  }

  public get cart_item() {
    return $("div.cart_item");
  }

  public get cart_items() {
    return $$("div.cart_item");
  }

  public get checkout_btn() {
    return $("button#checkout");
  }

  public get error_message(){
    return $('div.error-message-container');
  }

  public async check_cart_is_displayed() {
    const cart = await this.cart;
    expect(cart).toBeClickable();
    expect(cart).toBeDisplayedInViewport();
  }

  public async get_cart_item_value_and_match_with_expected(
    expected_name: string, expected_price: string
  ) {
    const cart_item_values = await this.cart_item.getText();
    expect(cart_item_values).toContain(expected_name);
    expect(cart_item_values).toContain(expected_price);
  }

  public async click_on_checkout_bthn() {
    await this.checkout_btn.click();
  }

  public async check_no_cart_items_on_the_page(){
    const cartItems = await this.cart_items;
    expect(cartItems.length).toBe(0);
  }

  public async check_error_message_is_present(expected_error_message: string){
    const err_message = await this.error_message.getText();
    expect(err_message).toBe(expected_error_message);
  }
}

export default new CartPage();
