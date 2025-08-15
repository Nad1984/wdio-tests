import loginPage from "../pageobjects/login.page.js";
import { testData } from "../data/test-data";

describe("Login with invalid data", () => {
  it("Should not login with invalid password", async () => {
    await loginPage.open();
    const randomValue = `test_${Math.random().toString(36).substring(2, 10)}`;
    await loginPage.login(testData.user.userName, randomValue);
    await loginPage.checkValidationIsPresentWhenInvalidLogin();
  });
  it("Should not login with invalid user name", async () => {
    await loginPage.open();
    const randomValue = `test_${Math.random().toString(36).substring(2, 10)}`;
    await loginPage.login(randomValue, testData.user.password);
    await loginPage.checkValidationIsPresentWhenInvalidLogin();
  });
});
