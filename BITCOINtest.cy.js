/// <reference types="cypress"/>
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
describe("Marketwatch test", () => {
  it("Accepts the cookie banner", () => {
    cy.visit("https://www.marketwatch.com/");

    // Find the cross-origin iframe by its ID
    cy.get("#sp_message_iframe_719544").then(($iframe) => {
      // Get the iframe's document and window objects
      const $doc = $iframe.contents();
      const $win = $iframe[0].contentWindow;

      // Wait for the iframe to finish loading
      cy.wrap($win)
        .should("not.be.undefined")
        .then(() => {
          // Find the accept button in the iframe
          $doc.find('[aria-label="YES, I AGREE"]').click();
          //Search for Bitcoin USD
          cy.get(".btn--search").click();
          cy.get("#mw-search").type("Bitcoin USD");
          cy.contains("BTCUSD").click();
          //Check if 5 days performance rate is positive
        });
    });
  });
});
