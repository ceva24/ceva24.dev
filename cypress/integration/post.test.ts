/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("Post page", () => {
    it("Renders", () => {
        cy.visit("/posts/introduction");

        cy.percySnapshot();
    });

    it("Renders syntax highlighting", () => {
        cy.visit("/posts/hibernate-grails-caching");

        cy.get(".syntax--java").should("exist");

        cy.percySnapshot();
    });

    it("Contains the header", () => {
        cy.visit("/posts/introduction");

        cy.contains("Introduction - Welp");
    });

    it("Contains the post content", () => {
        cy.visit("/posts/introduction");

        cy.contains(
            "I decided to invest in some webspace and set up a blog here"
        );
    });

    it("Has a home link that returns to the index page", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("link", { name: "Home" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("Returns to the index page when clicking on the bio title", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("link", { name: "Chris Evans" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });
});
