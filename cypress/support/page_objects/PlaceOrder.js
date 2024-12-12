import { recurse } from "cypress-recurse";
export default class PlaceOrder {
  getPlaceOrderButton() {
    return cy.get(".btn-success");
  }
  getPlaceOrderPopup() {
    return cy.get("#orderModal .modal-content");
  }
  typeName(name) {
    recurse(
      () => cy.get("#name").clear().type(name),
      ($input) => $input.val() === name,
      {
        delay: 1000,
        timeout: 5000,
      }
    );
  }
  typeCountry(country) {
    return cy.get("#country").should("be.visible").type(country);
  }
  typeCity(city) {
    return cy.get("#city").should("be.visible").type(city);
  }
  typeCreditCard(creditCard) {
    return cy.get("#card").should("be.visible").type(creditCard);
  }
  typeMonth(month) {
    return cy.get("#month").should("be.visible").type(month);
  }
  typeYear(year) {
    return cy.get("#year").should("be.visible").type(year);
  }
  getPurchaseButton() {
    return cy.xpath("//button[text()='Purchase']");
  }
  getPurchaseConfirmationPopup() {
    return cy.get(".sweet-alert");
  }
}
