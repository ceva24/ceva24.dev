/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("post page", () => {
    it("renders", () => {
        cy.visit("/posts/introduction");

        cy.percySnapshot();
    });

    it("sets the page title", () => {
        cy.visit("/posts/introduction");

        cy.title().should("equal", "Introduction - Welp");
    });

    it("renders syntax highlighting", () => {
        cy.visit("/posts/hibernate-grails-caching");

        cy.get(".syntax--java").should("exist");

        cy.percySnapshot();
    });

    it("contains the header", () => {
        cy.visit("/posts/introduction");

        cy.contains("Introduction - Welp");
    });

    it("contains the post content", () => {
        cy.visit("/posts/introduction");

        cy.contains(
            "I decided to invest in some webspace and set up a blog here"
        );
    });

    it("has a home link that returns to the index page", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("link", { name: "Home" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });
});
