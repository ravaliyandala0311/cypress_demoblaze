import { recurse } from "cypress-recurse";

export default class PageLogin {
  // Method to visit login page
  visit() {
    const baseUrl = Cypress.env("baseUrl");
    cy.visit(`${baseUrl}`);
  }
  constructor() {
    this.userNameInput = "#loginusername";
    this.passwordInput = "#loginpassword";
    this.loginButton = "button[onclick='logIn()']";
  }

  typeUsername(userName) {
    recurse(
      () => cy.get(this.userNameInput).clear().type(userName),
      ($input) => $input.val() === userName,
      {
        delay: 1000,
        timeout: 5000,
      }
    );
  }
  // Method to enter the password
  typePassword(password) {
    return cy.get(this.passwordInput).should("be.visible").type(password);
  }
  // Method to click login button
  clickLogin() {
    return cy.get(this.loginButton).should("be.enabled").click();
  }
  // Method to perform the complete login action
  loginWithUserNamePassword(email, password) {
    this.typeUsername(email);
    this.typePassword(password);
    this.clickLogin();
  }

  getLoginButton() {
    return cy.get("#login2").should("be.visible");
  }
  verfiyLoginPopup() {
    return cy.get("#logInModal .modal-header");
  }
  verifyNameOfUser() {
    return cy.get("#nameofuser").should("be.visible");
  }
}
