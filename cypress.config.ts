import { defineConfig } from "cypress";

export default defineConfig({
    projectId: "eu8aa1",
    fixturesFolder: false,
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    e2e: {
        baseUrl: "http://localhost:9000",
        supportFile: false,
        specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    },
});
