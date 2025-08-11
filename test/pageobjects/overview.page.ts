import { $ } from "@wdio/globals";
import Page from "./page.js";
import { testData } from "../data/test-data.js";

class OverviewPage extends Page {
  public get page_name() {
    return $("span.title");
  }

  public get product_name() {
    return $("div.inventory_item_name");
  }

  public get product_price() {
    return $("div.inventory_item_price");
  }

  public get total_price() {
    return $("div.summary_total_label");
  }

  public get summary_subtotal_label() {
    return $("div.summary_subtotal_label");
  }

  public get finish_bthn() {
    return $("#finish");
  }

  public async check_page_name() {
    const page_name = await this.page_name.getText();
    expect(page_name).toBe(testData.titles.title_overview);
  }

  public async get_product_name_and_compare_with_expected(
    expected_value: string
  ) {
    const cart_item_values = await this.product_name.getText();
    expect(cart_item_values).toContain(expected_value);
  }

  public async get_product_price_and_compare_with_expected(
    expected_value: string
  ) {
    const cart_item_values = await this.product_price.getText();
    expect(cart_item_values).toContain(expected_value);
  }

  public async get_product_price_and_compare_with_subtotal(
    expected_value: string
  ) {
    const cart_item_values = await this.summary_subtotal_label.getText();
    expect(cart_item_values).toContain(expected_value);
  }

  public async click_on_finish_bthn() {
    await this.finish_bthn.click();
  }

  public sleep() {
    return super.sleep();
  }
}

export default new OverviewPage();
