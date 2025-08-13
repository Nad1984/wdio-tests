import Page from "./page.js";
import { testData } from "../data/test-data.js";

class CheckoutCompletePage extends Page {
  public get pageName() {
    return $("span.title");
  }

  public get successMessage() {
    return $("h2");
  }

  public get backHomeBthn() {
    return $("#back-to-products");
  }

  public async checkPageName() {
    await expect(this.pageName).toHaveText(testData.titles.titleCheckoutComplete);
  }

  public async checkSuccessMessage(expectedMessage: string) {
    await expect(this.successMessage).toHaveText(expectedMessage);
  }

  public async clickOnBackHomeBthn() {
    await this.backHomeBthn.click();
  }
}

export default new CheckoutCompletePage();
