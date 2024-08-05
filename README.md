# demoblaze-test-automation
Playwright Test Automation Sample Project With POM

The following test case is automated in this project with the page object model and can run against multiple environments, different screen sizes and mobile views to check site responsiveness. Also test is parameterized to achieve a data-driven test for various input scenarios.

# Test Case Outline

<table width="300">
  <tr>
    <td> <strong> Test Steps </td>
    <td> <strong> Verifications </td>
  </tr>
  <tr>
    <td> 1. User sign up to https://www.demoblaze.com </td>
    <td> Verify "Sign up successful" received in browser alert </td>
  </tr>
  <tr>
    <td> 2. Login to the app with sign-up user </td>
    <td> Verify Welcome text contains the new user's user name </td>
  </tr>
  <tr>
    <td> 3. Select the category 'laptops' and search for the item name <br> containing the keyword eg: 'Sony', and through navigation </td>
    <td> Verify selected item names contains the keyword </td>
  </tr>
   <tr>
    <td> 4. Click on the products that are selected </td>
    <td> Verify it will display with the correct product name and price is visible as epected </td>
  </tr>
   <tr>
    <td> 5. Click 'Add to cart' </td>
    <td> Verify browser alert contains 'Product added.'  </td>
  </tr>
   <tr>
    <td> 6. Do above for all the products searched before <br> coming back to home page </td>
    <td> --do--  </td>
  </tr>
   <tr>
    <td> 7. Click on the cart link on the top menu </td>
    <td> Verify added items are available with correct name and price, <br> and item count <br> and total amount  </td>
  </tr>
  <tr>
    <td> 8. Remove one item from the cart  </td>
    <td> Verify item count reduced and the total amount is reduced </td>
  </tr>
   <tr>
    <td> 9. Place the order adding detail  </td>
    <td> Verify total price and other details available in success message </td>
  </tr>
</table>

## Assumption

* There are more than one products available for given search keyword.
* 'Sony vaio i5', 'Samsung galaxy s6' and 'Dell i7 8gb' are available.



# How To Run

Prerequisites:  
Install Node.js latest (18 +)

1. Git clone the project https://github.com/maheshcode/demoblaze-test-automation.
2. Move to folder 'demobalze-test-automation'.
3. Execute 'npm install'.
4. Execute 'npx playwright install' for default browsers
5. Execute 'npx playwright test order-placement.spec.ts --project=chromium' to run the test.
6. After the test gets executed (it will take around 40 seconds) execute 'npx playwright show-report' for the report.

# Run With VSCode
https://playwright.dev/docs/getting-started-vscode

1. Open the project with VScode
2. Select the "Show browser" and 'chromium' option from left nav and run the test

   ![image](https://github.com/user-attachments/assets/4ef8bb92-9d73-496d-9b7d-bfcc4c90206a)


# + Points

## Running test for site responsiveness across different screen sizes and devices
   
Different projects config in playwright.config to run in different screen sizes and device emulators, 

  projects: [
  
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
    },
    {
      name: 'chromium_screen',
      use: { ...devices['Desktop Chrome'] ,
        viewport: { width: 1920, height: 1080 },
            },
    },
    
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ]


Add the project parameter when running the test in the command line "npx playwright test order-placement.spec.ts --project='Mobile Safari'"
or use VSCode as follows

![image](https://github.com/user-attachments/assets/7206e729-8a62-4f99-9904-d2273c809561)

## Implement data-driven for various input scenario

The test case mentioned above implemented with parameterized test where it can run for vsrious inputs. It can further implement to get data from files if there is lot input data sets.

![image](https://github.com/user-attachments/assets/3c5b5952-e140-4d9e-b493-5ab1ceb48d69)




