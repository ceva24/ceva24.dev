/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("index page", () => {
    it("renders", () => {
        cy.visit("/");

        cy.percySnapshot();
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

    it("contains the bio", () => {
        cy.visit("/");

        cy.contains("Chris Evans");
        cy.contains(
            "A Web Development / Systems Integration Team Leader at the University of York"
        );
    });

    it("contains the bio head shot", () => {
        cy.visit("/");

        cy.findByRole("img")
            .invoke("attr", "src")
            .should("contain", "/profile-picture.png");
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
