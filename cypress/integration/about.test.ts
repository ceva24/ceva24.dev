/* eslint-disable import/no-unassigned-import */
import "@percy/cypress";
import "@testing-library/cypress/add-commands";

describe("about page", () => {
    it("renders", () => {
        cy.visit("/about");

        cy.percySnapshot();
    });

    it("sets the page title", () => {
        cy.visit("/about");

        cy.title().should("equal", "Chris Evans");
    });

    it("contains the about text", () => {
        cy.visit("/about");

        cy.contains("Hi! I'm a Development Team Lead from York, UK");
    });

    it("contains the picture", () => {
        cy.visit("/about");

        cy.findByRole("img", { name: "Chris Evans" }).should("exist");
    });
});
