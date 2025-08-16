import { baseConfig } from './wdio.base.conf';

const isCI = process.env.CI === 'true';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  capabilities: [
    ...baseConfig.capabilities!,
    {
      browserName: 'firefox',
      'moz:firefoxOptions': { args: ['-headless'] },
    },
    ...(!isCI ? [{ browserName: 'safari' }] : []),
  ],
  ...(isCI && {
    hostname: 'selenium-hub',
    port: 4444,
    path: '/wd/hub',
  }),
};
