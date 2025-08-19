import loginPage from "../pageobjects/login.page.js";
import { faker } from "@faker-js/faker";
import { generateRandomString } from "../helpers/generateRandomData.js";

describe("Login with invalid data", () => {
  it("Should not login with invalid password", async () => {
    await loginPage.open();
    const randomValue = generateRandomString();
    await loginPage.login(faker.internet.displayName(), randomValue);
    await loginPage.checkValidationIsPresentWhenInvalidLogin();
  });
  it("Should not login with invalid user name", async () => {
    await loginPage.open();
    const randomValue = generateRandomString();
    await loginPage.login(randomValue, faker.internet.password());
    await loginPage.checkValidationIsPresentWhenInvalidLogin();
  });
});
