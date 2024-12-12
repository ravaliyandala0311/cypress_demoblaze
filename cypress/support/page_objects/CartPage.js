export default class CartPage {
  getCartButton() {
    return cy.xpath("//a[text()='Cart']");
  }
  getEachProductPrice() {
    return cy.get("tbody tr td:nth-child(3)");
  }
  getTotalProductPrice() {
    return cy.get("#totalp");
  }
}
