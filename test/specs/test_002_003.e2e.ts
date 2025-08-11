import LoginPage from "../pageobjects/login.page.js";
import { testData } from "../data/test-data";

describe("Login with invalid data", () => {
  it("Should not login with invalid passord", async () => {
    await LoginPage.open();
    const randomValue = `test_${Math.random().toString(36).substring(2, 10)}`;
    await LoginPage.login(testData.user.username, randomValue);
    await LoginPage.check_error_icons_are_visible();
    await LoginPage.check_fields_color();
    await LoginPage.check_error_message();
  });
  it("Should not login with invalid user name", async () => {
    await LoginPage.open();
    const randomValue = `test_${Math.random().toString(36).substring(2, 10)}`;
    await LoginPage.login(randomValue, testData.user.password);
    await LoginPage.check_error_icons_are_visible();
    await LoginPage.check_fields_color();
    await LoginPage.check_error_message();
  });
});
