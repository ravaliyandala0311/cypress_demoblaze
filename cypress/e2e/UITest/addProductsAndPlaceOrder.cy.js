import ProductsPage from "../../support/page_objects/ProductsPage";
import CartPage from "../../support/page_objects/CartPage";
import PlaceOrder from "../../support/page_objects/PlaceOrder";

describe("Login and add the products and Place the order", () => {
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();
  const placeOrder = new PlaceOrder();

  before(() => {
    cy.loginWithUserNamePassword(); // Assuming login persists throughout the test
  });

  it("Test - Verify user can login, find and add products to cart", () => {
    // Define products to add from a configuration or fixture
    const productsToAdd = ["Iphone 6 32gb", "ASUS Full HD"];

    productsToAdd.forEach((productName) => {
      cy.selectProduct(productName).then((found) => {
        if (found) {
          productsPage.getHomeButton().should("be.visible").click(); // Navigate back to products for the next search
        } else {
          cy.log(`${productName} not found on any page!`);
        }
      });
    });

    // Cart actions
    cartPage.getCartButton().should("be.visible").click();
    let sumOfProductsPrice = 0;

    // Calculate the product prices
    cartPage
      .getEachProductPrice()
      .should("be.visible")
      .each(($price) => {
        const priceValue = parseInt($price.text().trim());
        sumOfProductsPrice += priceValue;
        cy.log(sumOfProductsPrice);
      })
      .then(() => {
        cartPage
          .getTotalProductPrice()
          .should("be.visible")
          .then(($totalPrice) => {
            const totalProductsPrice = parseInt($totalPrice.text().trim());
            cy.log(totalProductsPrice);
            expect(sumOfProductsPrice).to.equal(totalProductsPrice);
          });
      });

    cy.fixture("placeOrderDetails").then((details) => {
      // Place order
      placeOrder.getPlaceOrderButton().should("be.enabled").click();
      placeOrder.getPlaceOrderPopup().should("be.visible");
      placeOrder.typeName(details.name);
      placeOrder.typeCountry(details.country);
      placeOrder.typeCity(details.city);
      placeOrder.typeCreditCard(details.creditCard);
      placeOrder.typeMonth(details.month);
      placeOrder.typeYear(details.year);
      placeOrder.getPurchaseButton().should("be.enabled").click();
      cy.wait(1000);
      placeOrder
        .getPurchaseConfirmationPopup()
        .should("be.visible")
        .find("h2")
        .should("contain", details.successMessage);
    });
  });
});
