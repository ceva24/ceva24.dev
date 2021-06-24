// eslint-disable-next-line import/no-unassigned-import
import "@percy/cypress";

describe("Index page", () => {
    it("Renders", () => {
        cy.visit("/");

        cy.percySnapshot();
    });

    it("Contains the bio", () => {
        cy.visit("/");

        cy.contains("Chris Evans");
    });

    it("Has a list of posts", () => {
        cy.visit("/");

        cy.get(".post").should("have.length.above", 10);
    });

    it("Can click on a post to navigate to the post", () => {
        cy.visit("/");

        cy.get(".post").first().find("a").click();

        cy.url().should("include", "/posts/");
    });
});
