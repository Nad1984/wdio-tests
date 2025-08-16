import { baseConfig } from "./wdio.base.conf";

const isCI = process.env.CI === "true";
export const config: WebdriverIO.Config = {
  ...baseConfig,
  
  // Override or augment capabilities
  capabilities: [
    ...baseConfig.capabilities,
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
    // Only run Safari locally
    ...(!isCI ? [{ browserName: "safari" }] : []),
  ],

  // Add Selenium Grid config when in GitHub Actions
  ...(isCI && {
    hostname: "selenium-hub",
    port: 4444,
    path: "/wd/hub",
  }),
};