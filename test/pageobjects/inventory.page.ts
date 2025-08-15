import Page from "./page.js";
import { testData } from "../data/test-data";

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

  public async checkUserOnInventoryPage() {
    await expect(this.logo).toBeExisting();
    await expect(this.logo).toHaveText(
      expect.stringContaining(testData.titles.logo)
    );
    await expect(this.logo).toMatchElementSnapshot("div.app_logo");
    await this.checkPageUrl();
    await expect(this.cart).toBeClickable();
    await expect(this.cart).toBeDisplayedInViewport();
    const inventoryItems = await this.items;
    expect(inventoryItems.length).toBe(6);
    await expect(this.shoppingCartBadge).not.toBeExisting();
  }

  public async clickOnBurgerMenuButton() {
    await this.burderMenuButton.click();
    await expect(this.burderMenu).toBeDisplayed();
    await this.checkBurgerMenuItemsCount();
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

  public async addFirstProductToCartAndCheckIfAdded(
    expectedProductsCount: string
  ) {
    const products = await this.products;
    const firstProduct = products[0];
    const firstProductNameElement = firstProduct.$("div.inventory_item_name");
    const firstProductName = await firstProductNameElement.getText();
    const firstProductPriceElement = await firstProduct.$(
      "div.inventory_item_price"
    );
    const priceText = await firstProductPriceElement.getText();
    const addToCartButton = await firstProduct.$(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    await addToCartButton.click();
    await expect(this.shoppingCartBadge).toHaveText(expectedProductsCount);
    return [firstProductName, priceText];
  }

  public async sortPriceLowToHighCheckIfSorted() {
    await this.select.selectByVisibleText("Price (low to high)");
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

  public async SortPriceHighToLowCheckIfSorted() {
    await this.select.selectByVisibleText("Price (high to low)");
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

  public async sortProductNameAZCheckIfSorted() {
    await this.select.selectByVisibleText("Name (A to Z)");
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

  public async sortProductNamesZACheckIfSorted() {
    await this.select.selectByVisibleText("Name (Z to A)");
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
    await this.checkTwitterLinkOpensInNewWindow();
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
    await this.checkFacebookLinkOpensInNewWindow();
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
    await this.checkLinkedinLinkOpensInNewWindow();
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
