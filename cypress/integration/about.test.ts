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

        cy.title().should("equal", "Chris Evans - About");
    });

    it("contains the about text", () => {
        cy.visit("/about");

        cy.contains("Hi! I'm an Engineering Manager from York, UK");
    });

    it("contains the picture", () => {
        cy.visit("/about");

        cy.findByRole("img", { name: "Chris Evans" }).should("exist");
    });

    it("sets the current page link in the nav", () => {
        cy.visit("/about");

        cy.findByRole("navigation")
            .findByRole("link", { name: "ABOUT" })
            .invoke("attr", "aria-current")
            .should("equal", "page");
    });
});
