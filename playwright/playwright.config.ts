import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "specs/",
  testIgnore: "specs/recorder.spec.ts",
  outputDir: "./artifacts/test-results",
  timeout: 60000,
  globalTimeout: 0,
  globalSetup: require.resolve("./utils/global-setup"),
  globalTeardown: require.resolve("./utils/global-teardown"),
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: process.env.CI ? "on" : "off",
    video: process.env.CI ? "on-first-retry" : "off",
    trace: process.env.CI ? "retain-on-failure" : "off",
  },
  forbidOnly: !!process.env.CI,
  preserveOutput: process.env.CI ? "failures-only" : "always",
  maxFailures: process.env.CI ? 5 : undefined,
  reportSlowTests: process.env.CI ? { max: 3, threshold: 60000 } : null,
  workers: process.env.CI ? 3 : 1,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["allure-playwright"], ["github"]] : "list",
};

export default config;