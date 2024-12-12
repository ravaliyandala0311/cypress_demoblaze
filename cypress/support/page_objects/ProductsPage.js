export default class ProductsPage {
  getHomeButton() {
    return cy.get(".active > .nav-link");
  }

  getEachProductName() {
    return cy.get(".card-title > a").should("be.visible");
  }
  getAddToCartButton() {
    return cy.get(".btn-success");
  }
  getNextButton() {
    return cy.get(".page-item > #next2");
  }
}
