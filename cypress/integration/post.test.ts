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

    it("contains the banner", () => {
        cy.visit("/");

        cy.findByRole("banner").contains("Chris Evans");
    });

    it("contains the header", () => {
        cy.visit("/posts/introduction");

        cy.contains("Introduction - Welp");
    });

    it("contains the post content", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("article").contains(
            "I decided to invest in some webspace and set up a blog here"
        );
    });

    it("renders syntax highlighting", () => {
        cy.visit("/posts/hibernate-grails-caching");

        cy.get(".syntax--java").should("exist");

        cy.percySnapshot();
    });

    it("renders tables", () => {
        cy.visit("/posts/new-pc");

        cy.findByRole("table").should("exist");

        cy.percySnapshot();
    });

    it("navigates to the index page when clicking on the banner header", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("banner").findByRole("heading").click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("navigates to the index page when clicking on the home link", () => {
        cy.visit("/posts/introduction");

        cy.findByRole("link", { name: "Home" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("contains the footer with the expected content", () => {
        cy.visit("/posts/introduction");

        cy.get("footer")
            .findByRole("img", { name: "Chris Evans profile picture" })
            .should("exist");

        cy.get("footer").contains(
            "A Web Development / Systems Integration Team Leader at the University of York, UK"
        );
    });
});
