import Page from "./page.js";
import { testData } from "../data/test-data.js";

class LoginPage extends Page {
  public get inputUsername() {
    return $("#user-name");
  }

  public get inputPassword() {
    return $("#password");
  }

  public get btnSubmit() {
    return $("#login-button");
  }

  public get errorIcons() {
    return $$(".error_icon");
  }

  public get errorMessage() {
    return $("div.error-message-container.error");
  }

  public async checkErrorIconsAreVisible() {
    const icons = await this.errorIcons;
    for (const icon of icons) {
      await expect(icon).toBeDisplayed();
    }
  }

  public async checkFieldsColor() {
    const borderColorPassword = await this.inputPassword.getCSSProperty(
      "border-bottom-color"
    );
    const borderColorUsername = await this.inputUsername.getCSSProperty(
      "border-bottom-color"
    );
    expect(borderColorPassword.parsed.hex).toEqual("#e2231a");
    expect(borderColorUsername.parsed.hex).toEqual("#e2231a");
  }

  public async checkErrorMessage() {
    const expectedErrorMessage = testData.messages.loginErrorMessage;
    expect(this.errorMessage).toHaveText(expectedErrorMessage);
  }

  public async checkValidationIsPresentWhenInvalidLogin() {
    await this.checkErrorIconsAreVisible();
    await this.checkFieldsColor();
    await this.checkErrorMessage();
  }

  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await expect(this.inputUsername).toHaveValue(username);
    await this.inputPassword.setValue(password);
    await expect(this.inputPassword).toHaveValue(password);
    await expect(this.inputPassword).toHaveAttr("type", "password");
    await this.btnSubmit.click();
  }

  public async loginUser(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public async checkPageUrl() {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe(testData.urls.baseUrl);
  }

  public async checkFieldsAreEmpty() {
    await expect(this.inputUsername).toHaveValue("");
    await expect(this.inputPassword).toHaveValue("");
  }

  public open() {
    return super.open("");
  }
}

export default new LoginPage();
