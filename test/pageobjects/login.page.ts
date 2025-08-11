import { $, expect } from "@wdio/globals";
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

  public get error_icons() {
    return $$(".error_icon");
  }

  public get error_message() {
    return $("div.error-message-container.error");
  }
  public async check_if_password_is_masked() {
    const passwordField = await this.inputPassword;
    const typeAttribute = await passwordField.getAttribute("type");
    expect(typeAttribute).toBe("password");
  }

  public async check_user_name_is_entered(expected_user_name: string) {
    const initialValue = await this.inputUsername.getValue();
    expect(initialValue).toEqual(expected_user_name);
  }

  public async check_password_is_entered(expected_password: string) {
    const initialValue = await this.inputPassword.getValue();
    expect(initialValue).toEqual(expected_password);
  }

  public async check_error_icons_are_visible() {
    const error_icons = await this.error_icons;
    expect(error_icons).toBeDisplayed();
  }

  public async check_fields_color() {
    const borderColorPassword = await this.inputPassword.getCSSProperty(
      "border-bottom-color"
    );
    const borderColorUsername = await this.inputUsername.getCSSProperty(
      "border-bottom-color"
    );
    expect(borderColorPassword.parsed.hex).toEqual("#e2231a");
    expect(borderColorUsername.parsed.hex).toEqual("#e2231a");
  }

  public async check_error_message() {
    const expected_error_message =
      "Epic sadface: Username and password do not match any user in this service";
    const error_message = await this.error_message.getText();
    expect(error_message).toBe(expected_error_message);
  }

  public async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.check_user_name_is_entered(username);
    await this.inputPassword.setValue(password);
    await this.check_password_is_entered(password);
    await this.check_if_password_is_masked();
    await this.btnSubmit.click();
  }

  public async check_page_url() {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe(testData.urls.base_url);
  }

  public async check_fields_are_empty() {
    const valueUsername = await this.inputUsername.getValue();
    const valuePassword = await this.inputPassword.getValue();
    expect(valueUsername).toEqual("");
    expect(valuePassword).toEqual("");
  }

  public open() {
    return super.open("");
  }
}

export default new LoginPage();
