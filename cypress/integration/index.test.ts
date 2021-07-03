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
                "Chris Evans, a Web Development / Systems Integration Team Leader at the University of York"
            );
    });

    it("has the banner", () => {
        cy.visit("/");

        cy.findByRole("banner").contains("Chris Evans");
    });

    it("has a list of posts", () => {
        cy.visit("/");

        cy.findAllByRole("link").should("have.length.above", 10);
    });

    it("can click on a post to navigate to the post", () => {
        cy.visit("/");

        cy.findByRole("link", { name: "Introduction - Welp" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/posts/introduction`);
    });
});
