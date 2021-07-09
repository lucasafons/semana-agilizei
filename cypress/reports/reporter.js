const reporter = require('cucumber-html-reporter')

const options = {
    theme: 'bootstrap',
        jsonDir: 'cypress/reports/cucumber-json',
        output: 'cypress/reports/index.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Name":"Demo Automation",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Ubuntu",
            "Parallel": "Scenarios",
            "Executed": "Local"
    }
};

reporter.generate(options) 