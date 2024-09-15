const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://host.docker.internal:80',
    supportFile: false,
    specPattern: "**/*.spec.js"
  },
})