CEGID_QA_CODING_CHALLENGE
This project includes Cypress test cases to automate the following scenarios:

    E-commerce Website (https://www.demoblaze.com/):
        Log in using specific credentials.
        Add selected items to the shopping cart.
        Place an order.

    REST API (https://gorest.co.in/):
        Create a new user.
        Verify the user's creation.
        Delete the user.

Prerequisites
Node.js: Ensure Node.js (v14 or higher) is installed on your system.
Cypress: Installed as part of the project’s dependencies.

Installation
Download the ZIP File:
Obtain the ZIP file CEGID_QA_CODING_CHALLENGE.zip containing the project files.

    Extract the ZIP File:
        Right-click on the ZIP file and select "Extract All...".
        Choose a destination folder to extract the files.

    Navigate to the Project Directory in Command Prompt:
        Open Command Prompt.
            Use the cd command to navigate to the extracted project folder. For example:
                cd path\to\CEGID_QA_CODING_CHALLENGE

Install Dependencies:
Run the following command to install all required dependencies:
npm install

Project Structure
cypress/e2e/: Contains the test files
cypress/fixtures/: Contains test data or external files.
cypress/support/: Holds support commands and reusable code.
cypress.json: Cypress configuration file.
README.md: Instructions to set up and run the project.

Test Execution:
1.Running the Cypress Tests for E-commerce (Demoblaze)
To execute the e-commerce scenario tests:

    Open Command Prompt and navigate to the project directory.
        Run the following command to open the Cypress Test Runner:
                npx cypress open

In the Cypress Test Runner, select the test file for Demoblaze (e.g., addProductsAndPlaceOrder.cy.js), which is located in the cypress/e2e/UITest directory and select the test file for Demoblaze (e.g., createGetDeleteUser.cy.js), which is located in the cypress/e2e/APITest directory. Cypress will launch a browser and execute the test steps.

Alternatively, to run the test in headless mode:

To Run APITest
npx cypress run --spec "cypress/e2e/APITest/createGetDeleteUser.cy.js"

To Run UITest
npx cypress run --spec "cypress/e2e/UITest/addProductsAndPlaceOrder.cy.js"
