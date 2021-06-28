/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("Index page", () => {
    it("Renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("Contains the bio", () => {
        cy.visit("/");

        cy.contains("Chris Evans");
    });

    it("Contains the bio head shot", () => {
        cy.visit("/");

        cy.findByRole("img")
            .invoke("attr", "src")
            .should("contain", "/profile-picture.png");
    });

    it("Has a list of posts", () => {
        cy.visit("/");

        cy.findAllByRole("link").should("have.length.above", 10);
    });

    it("Can click on a post to navigate to the post", () => {
        cy.visit("/");

        cy.findByRole("link", { name: "Introduction - Welp" }).click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/posts/introduction`);
    });
});
