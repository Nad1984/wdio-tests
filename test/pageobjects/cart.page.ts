import Page from "./page.js";

class CartPage extends Page {
  public get cart() {
    return $("a.shopping_cart_link");
  }

  public get cartItem() {
    return $("div.cart_item");
  }

  public get cartItems() {
    return $$("div.cart_item");
  }

  public get checkoutBtn() {
    return $("button#checkout");
  }

  public get errorMessage() {
    return $("div.error-message-container");
  }

  public async checkCartIsDisplayed() {
    const cart = await this.cart;
    expect(cart).toBeClickable();
    expect(cart).toBeDisplayedInViewport();
  }

  public async checkCartItemValueMatchesWithExpected(
    expectedName: string,
    expectedPrice: string
  ) {
    const cartItemValues = await this.cartItem.getText();
    expect(cartItemValues).toContain(expectedName);
    expect(cartItemValues).toContain(expectedPrice);
  }

  public async clickOnCheckoutBthn() {
    await this.checkoutBtn.click();
  }

  public async checkNoCartItemsOnThePage() {
    const cartItems = await this.cartItems;
    expect(cartItems.length).toBe(0);
  }

  public async checkErrorMessageIsPresent(expectedErrorMessage: string) {
    expect(this.errorMessage).toHaveText(expectedErrorMessage);
  }
}

export default new CartPage();
