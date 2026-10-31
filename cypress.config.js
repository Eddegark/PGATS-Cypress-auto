const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Automation Exercise - Test Report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true
  },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 90000,
    video: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on)
    }
  }
})
