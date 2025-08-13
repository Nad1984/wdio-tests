import Page from "./page.js";

class CheckoutPage extends Page {
  public get checkoutForm() {
    return $("div.checkout_info");
  }

  public get firstNameField() {
    return $("#first-name");
  }
  public get lastNameField() {
    return $("#last-name");
  }

  public get zipCodeField() {
    return $("#postal-code");
  }

  public get continueBthn() {
    return $("#continue");
  }

  public async checkInformationFormIsVisible() {
    const info_form = await this.checkoutForm;
    expect(info_form).toBeDisplayed();
  }

  public async enterValidFirstName(firstName: string) {
    await this.firstNameField.setValue(firstName);
    await expect(this.firstNameField).toHaveValue(firstName);
  }

  public async enterValidLastName(lastName: string) {
    await this.lastNameField.setValue(lastName);
    await expect(this.lastNameField).toHaveValue(lastName);
  }

  public async enterValidZipCode(zip: string) {
    await this.zipCodeField.setValue(zip);
    await expect(this.zipCodeField).toHaveValue(zip);
  }

  public async clickContinueBthn() {
    await this.continueBthn.click();
  }
}

export default new CheckoutPage();
