/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("sets the page title", () => {
        cy.visit("/");

        cy.title().should("equal", "Chris Evans");
    });

    it("sets the page metadata description", () => {
        cy.visit("/");

        cy.get('meta[name="description"]')
            .invoke("attr", "content")
            .should(
                "equal",
                "Chris Evans, a Web Development / Systems Integration Team Leader at the University of York, UK"
            );
    });

    it("contains the banner", () => {
        cy.visit("/");

        cy.findByRole("banner").contains("Chris Evans");
    });

    it("contains the nav", () => {
        cy.visit("/");

        cy.findByRole("navigation").should("exist");
    });

    it("sets the current page link in the nav", () => {
        cy.visit("/");

        cy.findByRole("navigation")
            .findByRole("link", { name: "POSTS" })
            .invoke("attr", "aria-current")
            .should("equal", "page");
    });

    it("contains a list of posts", () => {
        cy.visit("/");

        cy.findAllByRole("link").should("have.length.above", 10);
    });

    it("navigates to the post page when clicking on a post", () => {
        cy.visit("/");

        cy.findByRole("link", { name: "Introduction - Welp" }).click();

        cy.url().should(
            "eq",
            `${Cypress.config().baseUrl}/posts/introduction/`
        );
    });

    it("does not contain the footer", () => {
        cy.visit("/");

        cy.get("footer").should("not.exist");
    });
});
