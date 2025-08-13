import Page from "./page.js";
import { testData } from "../data/test-data.js";

class OverviewPage extends Page {
  public get pageName() {
    return $("span.title");
  }

  public get productName() {
    return $("div.inventory_item_name");
  }

  public get productPrice() {
    return $("div.inventory_item_price");
  }

  public get totalPrice() {
    return $("div.summary_total_label");
  }

  public get summarySubtotalLabel() {
    return $("div.summary_subtotal_label");
  }

  public get finishBthn() {
    return $("#finish");
  }

  public async checkPageName() {
    await expect(this.pageName).toHaveText(testData.titles.titleOverview);
  }

  public async getProductNameAndCompareWithExpected(
    expectedValue: string
  ) {
    await expect(this.productName).toHaveText(expectedValue);
  }

  public async getProductPriceAndCompareWithExpected(
    expectedValue: string
  ) {
    await expect(this.productPrice).toHaveText(expectedValue);
  }

  public async getProductPriceAndCompareWithSubtotal(
    expectedValue: string
  ) {
    await expect(this.summarySubtotalLabel).toHaveText(expectedValue);
  }

  public async clickOnFinishBthn() {
    await this.finishBthn.click();
  }
}

export default new OverviewPage();
