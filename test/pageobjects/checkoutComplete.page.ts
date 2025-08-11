import { $ } from "@wdio/globals";
import Page from "./page.js";
import { testData } from "../data/test-data.js";

class CheckoutCompletePage extends Page {
  public get page_name() {
    return $("span.title");
  }

  public get success_message(){
    return $('h2');
  }

  public get back_home_bthn() {
    return $("#back-to-products");
  }

  public async check_page_name() {
    const page_name = await this.page_name.getText();
    expect(page_name).toBe(testData.titles.title_checkout_complete);
  }

  public async check_success_message(expected_message: string){
    const success_message = await this.success_message.getText();
    expect(success_message).toEqual(expected_message);
  }

  public async click_on_back_home_bthn() {
    await this.back_home_bthn.click();
  }
}

export default new CheckoutCompletePage();
