import "@wdio/allure-reporter";
export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./test/tsconfig.json",

  specs: ["./test/specs/**/*.ts"],

  exclude: [
  ],

  maxInstances: 10,

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["headless", "disable-gpu"],
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
    {
      browserName: "safari",
    },
  ],

  logLevel: "info",
  bail: 0,

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ["visual"],

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
  beforeSession: function () {
    require("ts-node").register({ files: true });
  },

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
