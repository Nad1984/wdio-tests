import { $ } from "@wdio/globals";
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

  public get burder_menu_button() {
    return $("#react-burger-menu-btn");
  }

  public get burder_menu() {
    return $(".bm-menu");
  }

  public get bugrer_menu_items() {
    return $$("a.bm-item.menu-item");
  }

  public get bugrer_menu_logout() {
    return $("a#logout_sidebar_link");
  }

  public get product_names() {
    return $$("div.inventory_item_name");
  }

  public get products() {
    return $$("div.inventory_item_description");
  }

  public get shopping_cart_badge() {
    return $("span.shopping_cart_badge");
  }

  public get select() {
    return $("select.product_sort_container");
  }

  public get product_prices() {
    return $$("div.inventory_item_price");
  }

  public get twitter_icon() {
    return $("li.social_twitter");
  }

  public get facebook_icon() {
    return $("li.social_facebook");
  }

  public get linkedin_icon() {
    return $("li.social_linkedin");
  }

  public async check_page_url() {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toContain("/inventory");
  }

  public async check_cart_is_displayed() {
    const cart = await this.cart;
    expect(cart).toBeClickable();
    expect(cart).toBeDisplayedInViewport();
  }

  public async check_products_on_the_page() {
    const productItems = await this.items;
    expect(productItems.length).toBe(6);
  }

  public async click_on_burger_menu_button() {
    await this.burder_menu_button.click();
  }

  public async check_burger_menu_is_visible() {
    const bm = await this.burder_menu;
    expect(bm).toBeDisplayed();
  }

  public async check_burger_menu_items_count() {
    const bm_menu_items = await this.bugrer_menu_items;
    expect(bm_menu_items.length).toBe(4);
  }

  public async click_on_logout_sidebar_link() {
    await this.bugrer_menu_logout.click();
  }

  public async click_on_cart() {
    await this.cart.click();
  }

  public async add_first_product_to_cart() {
    const products = await this.products;
    const first_product = products[0];
    const first_product_name_element = first_product.$(
      "div.inventory_item_name"
    );
    const first_product_name = await first_product_name_element.getText();
    const first_product_price_element = await first_product.$(
      "div.inventory_item_price"
    );
    const price_text = await first_product_price_element.getText();
    const price = parseFloat(price_text.replace(/[^0-9.]/g, ""));
    const add_to_cart_button = await first_product.$(
      ".btn.btn_primary.btn_small.btn_inventory"
    );
    await add_to_cart_button.click();
    return [first_product_name, price.toString()];
  }

  public async check_products_count_in_cart(expected_products_count: string) {
    const products_count_in_cart = await this.shopping_cart_badge.getText();
    expect(products_count_in_cart).toBe(expected_products_count);
  }

  public async check_cart_is_empty(){
    const cart_badge_exists = await this.shopping_cart_badge.isExisting();
     expect(cart_badge_exists).toBe(false);
  }

  public async select_sort_price_low_to_high() {
    const select = await this.select;
    await select.selectByVisibleText("Price (low to high)");
  }

  public async get_product_prices_check_if_sorted_low_to_high() {
    const price_elements = await this.product_prices;
    const prices: number[] = [];
    for (const el of price_elements) {
      const text = await el.getText();
      const numeric = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(numeric);
    }
    const sorted_prices_asc = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted_prices_asc);
  }

  public async select_sort_price_high_to_low() {
    const select = await this.select;
    await select.selectByVisibleText("Price (high to low)");
  }

  public async get_product_prices_check_if_sorted_high_to_low() {
    const price_elements = await this.product_prices;
    const prices: number[] = [];
    for (const el of price_elements) {
      const text = await el.getText();
      const numeric = parseFloat(text.replace(/[^0-9.]/g, ""));
      prices.push(numeric);
    }
    const sorted_prices_asc = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted_prices_asc);
  }

  public async select_sort_name_A_Z() {
    const select = await this.select;
    await select.selectByVisibleText("Name (A to Z)");
  }

  public async get_product_names_check_if_sorted_A_Z() {
    const product_names_elements = await this.product_names;
    const names: string[] = [];
    for (const el of product_names_elements) {
      const text = await el.getText();
      names.push(text.trim());
    }
    const sorted_names = [...names].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
    expect(names).toEqual(sorted_names);
  }

  public async select_sort_name_Z_A() {
    const select = await this.select;
    await select.selectByVisibleText("Name (Z to A)");
  }

  public async get_product_names_check_if_sorted_Z_A() {
    const product_names_elements = await this.product_names;
    const names: string[] = [];
    for (const el of product_names_elements) {
      const text = await el.getText();
      names.push(text.trim());
    }
    const sorted_names_desc = [...names].sort((a, b) =>
      b.localeCompare(a, undefined, { sensitivity: "base" })
    );
    expect(names).toEqual(sorted_names_desc);
  }

  public async check_twitter_link_opens_in_new_window() {
    const twitter_link = await this.twitter_icon.$("a");
    const href = await twitter_link.getAttribute("href");
    expect(href).toContain("https://twitter.com/saucelabs");
    const target = await twitter_link.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async click_on_twitter_link_and_return_on_inventory_page() {
    const originalWindow = await browser.getWindowHandle();
    await this.twitter_icon.click();
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
    const new_window_url = await browser.getUrl();
    expect(new_window_url).toMatch(/(twitter\.com|x\.com)/);

    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }

  public async check_facebook_link_opens_in_new_window() {
    const twitter_link = await this.facebook_icon.$("a");
    const href = await twitter_link.getAttribute("href");
    expect(href).toContain("https://www.facebook.com/saucelabs");
    const target = await twitter_link.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async click_on_facebook_link_and_return_on_inventory_page() {
    const originalWindow = await browser.getWindowHandle();
    await this.facebook_icon.click();
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
    const new_window_url = await browser.getUrl();
    expect(new_window_url).toMatch("facebook.com");
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }

  public async check_linkedin_link_opens_in_new_window() {
    const twitter_link = await this.linkedin_icon.$("a");
    const href = await twitter_link.getAttribute("href");
    expect(href).toContain("linkedin.com");
    const target = await twitter_link.getAttribute("target");
    expect(target).toBe("_blank");
  }

  public async click_on_linkedin_link_and_return_on_inventory_page() {
    const originalWindow = await browser.getWindowHandle();
    await this.linkedin_icon.click();
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
    const new_window_url = await browser.getUrl();
    expect(new_window_url).toMatch("linkedin.com");
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
    expect(await browser.getUrl()).toContain("saucedemo.com/");
  }

  public sleep() {
    return super.sleep();
  }
}

export default new InventoryPage();
