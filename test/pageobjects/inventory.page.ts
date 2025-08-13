import Page from "./page.js";

class InventoryPage extends Page {
  public get logo() {
    return $("div.app_logo");
  }

  public get cart() {
    return $("a.shopping_cart_link");
  }

  public get items() {
    return $$("div.inventory_item");
  }

  public get burderMenuButton() {
    return $("#react-burger-menu-btn");
  }

  public get burderMenu() {
    return $(".bm-menu");
  }

  public get bugrerMenuItems() {
    return $$("a.bm-item.menu-item");
  }

  public get bugrerMenuLogout() {
    return $("a#logout_sidebar_link");
  }

  public get productNames() {
    return $$("div.inventory_item_name");
  }

  public get products() {
    return $$("div.inventory_item_description");
  }

  public get shoppingCartBadge() {
    return $("span.shopping_cart_badge");
  }

  public get select() {
    return $("select.product_sort_container");
  }

  public get productPrices() {
    return $$("div.inventory_item_price");
  }

  public get twitterIcon() {
    return $("li.social_twitter");
  }

  public get facebookIcon() {
    return $("li.social_facebook");
  }

  public get linkedinIcon() {
    return $("li.social_linkedin");
  }

  public async checkPageUrl() {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/inventory");
  }

  public async checkCartIsDisplayed() {
    const cart = await this.cart;
    expect(cart).toBeClickable();
    expect(cart).toBeDisplayedInViewport();
  }

  public async checkProductsOnThePage() {
    const productItems = await this.items;
    expect(productItems.length).toBe(6);
  }

  public async clickOnBurgerMenuButton() {
    await this.burderMenuButton.click();
  }

  public async checkBurgerMenuIsVisible() {
    const bm = await this.burderMenu;
    expect(bm).toBeDisplayed();
  }

  public async checkBurgerMenuItemsCount() {
    const bmMenuItems = await this.bugrerMenuItems;
    expect(bmMenuItems.length).toBe(4);
  }

  public async clickOnLogoutSidebarLink() {
    await this.bugrerMenuLogout.click();
  }

  public async clickOnCart() {
    await this.cart.click();
  }

  public async addFirstProductToCart() {
    const products = await this.products;
    const firstProduct = products[0];
    const firstProductNameElement = firstProduct.$(
      "div.inventory_item_name"
    );
    const firstProductName = await firstProductNameElement.getText();
    const firstProductPriceElement = await firstProduct.$(
      "div.inventory_item_price"
    );
    const priceText = await firstProductPriceElement.getText();
    const addToCartButton = await firstProduct.$(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    await addToCartButton.click();
    return [firstProductName, priceText];
  }

  public async checkProductsCountInCart(expectedProductsCount: string) {
    const productsCountInCart = await this.shoppingCartBadge.getText();
    expect(productsCountInCart).toBe(expectedProductsCount);
  }

  public async checkCartIsEmpty() {
    const cartBadgeExists = await this.shoppingCartBadge.isExisting();
    expect(cartBadgeExists).toBe(false);
  }

  public async selectSortPriceLowToHigh() {
    await this.select.selectByVisibleText("Price (low to high)");
  }

  public async getProductPricesCheckIfSortedLowToHigh() {
    const priceElements = await this.productPrices;
    const prices: number[] = [];
    for (const el of priceElements) {
      const text = await el.getText();
      const numeric = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(numeric);
    }
    const sortedPricesAsc = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPricesAsc);
  }

  public async selectSortPriceHighToLow() {
    await this.select.selectByVisibleText("Price (high to low)");
  }

  public async getProductPricesCheckIfSortedHighToLow() {
    const priceElements = await this.productPrices;
    const prices: number[] = [];
    for (const el of priceElements) {
      const text = await el.getText();
      const numeric = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(numeric);
    }
    const sortedPricesAsc = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPricesAsc);
  }

  public async selectSortNameAZ() {
    await this.select.selectByVisibleText("Name (A to Z)");
  }

  public async getProductNamesCheckIfSortedAZ() {
    const productNamesElements = await this.productNames;
    const names: string[] = [];
    for (const el of productNamesElements) {
      const text = await el.getText();
      names.push(text.trim());
    }
    const sortedNames = [...names].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(names).toEqual(sortedNames);
  }

  public async selectSortNameZA() {
    await this.select.selectByVisibleText("Name (Z to A)");
  }

  public async getProductNamesCheckIfSortedZA() {
    const productNamesElements = await this.productNames;
    const names: string[] = [];
    for (const el of productNamesElements) {
      const text = await el.getText();
      names.push(text.trim());
    }
    const sortedNamesDesc = [...names].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );
    expect(names).toEqual(sortedNamesDesc);
  }

  public async checkTwitterLinkOpensInNewWindow() {
    const twitterLink = await this.twitterIcon.$("a");
    const href = await twitterLink.getAttribute("href");
    expect(href).toContain("https://twitter.com/saucelabs");
    const target = await twitterLink.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async clickOnTwitterLinkAndReturnOnInventoryPage() {
    const originalWindow = await browser.getWindowHandle();
    await this.twitterIcon.click();
    await browser.waitUntil(
      async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
      },
      {
        timeout: 5000,
        timeoutMsg: "Expected a new window to open after clicking the link",
      }
    );
    const windowHandles = await browser.getWindowHandles();
    const newWindow = windowHandles.find((handle) => handle !== originalWindow);
    if (!newWindow) throw new Error("New window not found");
    await browser.switchToWindow(newWindow);
    const newWindowUrl = await browser.getUrl();
    expect(newWindowUrl).toMatch(/(twitter\.com|x\.com)/);

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }

  public async checkFacebookLinkOpensInNewWindow() {
    const twitterLink = await this.facebookIcon.$("a");
    const href = await twitterLink.getAttribute("href");
    expect(href).toContain("https://www.facebook.com/saucelabs");
    const target = await twitterLink.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async clickOnFacebookLinkAndReturnOnInventoryPage() {
    const originalWindow = await browser.getWindowHandle();
    await this.facebookIcon.click();
    await browser.waitUntil(
      async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
      },
      {
        timeout: 5000,
        timeoutMsg: "Expected a new window to open after clicking the link",
      }
    );
    const windowHandles = await browser.getWindowHandles();
    const newWindow = windowHandles.find((handle) => handle !== originalWindow);
    if (!newWindow) throw new Error("New window not found");
    await browser.switchToWindow(newWindow);
    const newWindowUrl = await browser.getUrl();
    expect(newWindowUrl).toMatch("facebook.com");
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }

  public async checkLinkedinLinkOpensInNewWindow() {
    const twitterLink = await this.linkedinIcon.$("a");
    const href = await twitterLink.getAttribute("href");
    expect(href).toContain("linkedin.com");
    const target = await twitterLink.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async clickOnLinkedinLinkAndReturnOnInventoryPage() {
    const originalWindow = await browser.getWindowHandle();
    await this.linkedinIcon.click();
    await browser.waitUntil(
      async () => {
        const handles = await browser.getWindowHandles();
        return handles.length > 1;
      },
      {
        timeout: 5000,
        timeoutMsg: "Expected a new window to open after clicking the link",
      }
    );
    const windowHandles = await browser.getWindowHandles();
    const newWindow = windowHandles.find((handle) => handle !== originalWindow);
    if (!newWindow) throw new Error("New window not found");
    await browser.switchToWindow(newWindow);
    const newWindowUrl = await browser.getUrl();
    expect(newWindowUrl).toMatch("linkedin.com");
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }
}

export default new InventoryPage();
