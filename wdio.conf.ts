import "@wdio/allure-reporter";

const isCI = process.env.CI === "true"; // GitHub Actions sets this to true

export const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./test/specs/**/*.ts"],
  exclude: [],
  maxInstances: 5,

  baseUrl: "https://www.saucedemo.com/",

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu"],
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
    // Only run Safari if NOT in CI
    ...(!isCI
      ? [
          {
            browserName: "safari",
          },
        ]
      : []),
  ],

  logLevel: "info",
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  // Use Selenium Grid config only in CI (Docker)
  ...(isCI && {
    hostname: "selenium-hub",
    port: 4444,
    path: "/wd/hub",
  }),

  services: [],

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
