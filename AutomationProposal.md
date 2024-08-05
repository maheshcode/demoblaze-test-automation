# Test Automation Proposal For Demoblaze e-commerce Platform

This document will provide a test automation strategy for the Demoblaze e-commerce platform.


# Goals & Objectives of Automation

The ultimate goal of test automation is to maintain quick but quality deliveries. The time to market new features will be crucial without compromising the stability and quality of the platform. In other way goal is to have an automation suite to provide a better user experience of the e-commerce platform both in functional and non-functional aspects. 

The main objective is to have a stable automated test suite for regressions. If the application is more mature and has many regression test cases, prioritizing and selecting these cases for automation is essential. More focus should be on E2E user journeys that may validate the core functionalities covering multiple components. Need to keep adding automated tests for the suite with any new development of features.

Another objective is to have automated smoke or sanity test suites (Subset of regression) which will be helpful in build verifications.

The further objective is to use automation for non-function testing. Tracking and validating performance measures with UI flows will highlight platform performance risks associated with any new architectural or technological changes.


# Tools & Framework to Choose

Playwright is a better choice for eCommerce application testing. As for testing e-commerce applications may not need to worry much about backend integration and architecture it is important to focus on E2E UI experience of the user. 

1. Cross-browser Testing: It is important to ensure that the eCommerce application works consistently across different platforms. Playwright supports testing across multiple browsers (Chromium, Firefox, WebKit). Additionally, Playwright can run tests with various screen sizes and mobile emulators, ensuring the site's responsiveness.
2. End-to-end Testing: It provides a comprehensive solution for end-to-end testing, allowing you to simulate user interactions and verify the complete functionality of your application.
3. Parallel Testing: Playwright allows you to run tests in parallel, which can significantly speed up the testing process, essential for the fast-paced environment of eCommerce.
4. Network Interception: It supports network interception, enabling you to test how your application handles various network conditions, such as slow connections or outages, which is crucial for user experience. 
5. Robustness: Playwright offers reliable and stable tests, reducing flakiness and ensuring that your eCommerce site remains functional and performant.
6. Rich API: It provides a rich set of APIs for interacting with the DOM, handling frames, capturing screenshots, and generating PDFs, which are often needed for comprehensive testing scenarios.
7. Headless Mode: Playwright supports headless mode, allowing for faster execution of tests without a GUI, which is beneficial for continuous integration and deployment pipelines.
8. Advanced Automation Capabilities: It supports complex scenarios such as file uploads/downloads, form submissions, and multi-page navigation, which are common in eCommerce applications.
9. Visual Testing: Playwright can integrate with visual testing tools to ensure the visual integrity of your application, which is important for the user interface of eCommerce sites.
10. Performance measures: Playwright can extract performance metrics from tests and also integrate with tools like Lighthouse for additional client-side measurements.
11. Out-of-the-box API testing: Playwright can test APIs and make API calls, which is particularly useful for creating test data, even if you’re not performing extensive API testing.



# Setup Environment, Manage Test Data & Execute test

Automation projects need to be capable of running against a given environment. In Playwright, it can be done using dotenv NPM package https://www.npmjs.com/package/dotenv. The test environment-wise configuration(properties, eg: URL) needs to be in separate .env files to load accordingly. The test should have been designed in a way to run for a given environment with proper test data management. (Have discussed in below)

The best case is to have a non-prod environment to run test automation with real integrations. The regression test suites need to run against non-prod environments frequently that can be configured using DevOps pipeline. Having a daily run and having the report will be ideal as it will give an indication of the stability of the environment as the automation. 

Automation should be less dependent on predefined test data. In e-commerce applications, most tests are depend on the available products in the platform. Hence there can be have separate script developed and run more frequently to make sure desired number of products are available in an environment to run the regression. On the other hand test automation can be designed to pick available data from the environment for given criteria. if needed, in test preconditions implementation can manipulate the state of the data for a particular test, calling backend API or DB to make it fast instead of doing the same on UI flow within the test.

For the on-demand execution of the test, it needs to be configured in CI/CD pipeline job with runtime parameters to edit the environment, browser, branch, scope etc. Getting triggered with a development code push will be great for achieving continuous integration or quick validation of the new code.

The test needs to be designed in a way that it can run in parallel. This is important with the growth of the test suites to manage the full execution time. By default, playwrights have parallelism at the file level. Test data and resources should be in consideration for parallelism. 


