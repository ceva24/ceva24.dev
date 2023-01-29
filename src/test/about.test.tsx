import React from "react";
import { render } from "@testing-library/react";
import About, { Head } from "../pages/about";

jest.mock("gatsby", (): unknown => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

jest.mock("@gatsbyjs/reach-router", (): unknown => ({
    ...jest.requireActual("@gatsbyjs/reach-router"),
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/" };
    }),
}));

describe("about", () => {
    it("renders", () => {
        const { asFragment } = render(<About />);

        expect(asFragment()).toMatchSnapshot();
    });
});

describe("head", () => {
    it("renders", () => {
        const { asFragment } = render(<Head />);

        expect(asFragment()).toMatchSnapshot();
    });
});
