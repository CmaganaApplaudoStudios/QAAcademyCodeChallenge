const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity:false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

module.exports = {
  projectId: "iaeat4"
  // The rest of the Cypress config options go here...
}