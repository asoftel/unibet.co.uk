const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://rsa.unibet.co.uk/api/graphql/config/gb",
    projectId: "rsa.unibet.co.uk",
    fixturesFolder: "tests/integration/fixtures",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    excludeSpecPattern: "**/*visual*.cy.js",
    screenshotsFolder: "tests/integration/screenshots",
    videosFolder: "tests/integration/videos"
  },
  component: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  }
});
