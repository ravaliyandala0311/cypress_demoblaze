import LoginPage from "./page_objects/Loginpage";
import ProductsPage from "./page_objects/ProductsPage";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginWithUserNamePassword", () => {
  const baseUrl = Cypress.env("baseUrl");
  const username = Cypress.env("userName");
  const password = Cypress.env("userPassword");

  const loginPage = new LoginPage(); // Create an instance of the LoginPage

  cy.visit(baseUrl);
  loginPage.getLoginButton().click();
  //loginPage.verfiyLoginPopup().should("be.visible");
  // Perform login using the page object methods
  loginPage.loginWithUserNamePassword(username, password);
  //loginPage.verifyNameOfUser().should("contain", "Welcome admin");
});
Cypress.Commands.add("selectProduct", (productName) => {
  // Recursive function to search for the product
  const productsPage = new ProductsPage();
  function searchForProduct() {
    productsPage.getEachProductName().then(($products) => {
      // Check if there are any products
      if ($products.length === 0) {
        cy.log(`No products found for "${productName}".`);
        return; // Exit if no products are found
      }

      let found = false; // Flag to check if the product was found

      // Iterate through each product link using jQuery.each
      Cypress.$($products).each((index, element) => {
        const productText = Cypress.$(element).text(); // Get the product text
        cy.log(productText);
        if (productText.includes(productName)) {
          found = true; // Set flag to true if product is found

          cy.get(".card-title > a").eq(index).as("btn").click();
          cy.url().should("contain", "prod.html");
          productsPage.getAddToCartButton().click(); // Add to cart
          // Listen for the alert and confirm it says "Product added."
          cy.on("window:alert", (alertText) => {
            expect(alertText).to.equal("Product added.");
          });
          return false; // Break the loop after finding the product
        }
      });

      // If the product was not found on the current page
      if (!found) {
        productsPage.getNextButton().then(($nextButton) => {
          if ($nextButton.is(":visible")) {
            $nextButton.click(); // Click the next button to go to the next page
            cy.wait(1000); // Wait for the new page to load (consider a better wait strategy)
            searchForProduct(); // Call the function recursively to search again
          } else {
            cy.log(`Product "${productName}" not found on any available page.`);
          }
        });
      }
    });
  }

  // Start the search
  searchForProduct();
});
