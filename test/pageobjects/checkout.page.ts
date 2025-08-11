import { $ } from "@wdio/globals";
import Page from "./page.js";

class CheckoutPage extends Page {
  public get checkout_form() {
    return $("div.checkout_info");
  }

  public get first_name_field(){
    return $("#first-name");
  }
  public get last_name_field(){
    return $("#last-name");
  }

  public get zip_code_field(){
    return $("#postal-code");
  }

  public get continue_bthn(){
    return $("#continue");
  }

  public async check_information_form_is_visible(){
    const info_form = await this.checkout_form;
    expect(info_form).toBeDisplayed();
  }

  public async enter_valid_first_name(first_name: string){
    await this.first_name_field.setValue(first_name);
  }

  public async check_first_name_is_entered(expected_name: string) {
      const initialValue = await this.first_name_field.getValue();
      expect(initialValue).toEqual(expected_name);
    }

   public async enter_valid_last_name(last_name: string){
    await this.last_name_field.setValue(last_name);
  }

  public async check_last_name_is_entered(expected_name: string) {
      const initialValue = await this.last_name_field.getValue();
      expect(initialValue).toEqual(expected_name);
    }

  public async enter_valid_zip_code(zip: string){
    await this.zip_code_field.setValue(zip);
  }

  public async check_zip_is_entered(expected_zip: string) {
      const initialValue = await this.zip_code_field.getValue();
      expect(initialValue).toEqual(expected_zip);
    }

  public async click_continue_bthn(){
    await this.continue_bthn.click();
  }  

  public sleep() {
    return super.sleep();
  }
}

export default new CheckoutPage();
