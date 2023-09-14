const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 600000,
  defaultCommandTimeout: 100000,
  viewportHeight: 820,
  viewportWidth: 1024,
  failOnStatusCode: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
