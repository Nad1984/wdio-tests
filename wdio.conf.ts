import "@wdio/allure-reporter";
import { config as baseConfig } from "./wdio.conf";

const isCI = process.env.CI === "true"; // GitHub Actions sets this to true

export const config: WebdriverIO.Config = {
  ...baseConfig,
  runner: "local",
  specs: ["./test/specs/**/*.ts"],
  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": {
        args: ["--headless", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
      },
    },
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
    ...(isCI
      ? []
      : [
          {
            browserName: "safari",
          },
        ]),
  ],
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
