import "@wdio/allure-reporter";

export const baseConfig: WebdriverIO.Config = {
  runner: "local",
  specs: ["./test/specs/**/*.ts"],
  exclude: [],
  maxInstances: 5,
  baseUrl: "https://www.saucedemo.com/",
  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: "mocha",
  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  beforeSession: () => {
    require("ts-node").register({ files: true });
  },
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  // **Add default capabilities here**
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--headless",
          "--disable-gpu",
          "--no-sandbox",
          "--disable-dev-shm-usage",
        ],
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
  ],
};
