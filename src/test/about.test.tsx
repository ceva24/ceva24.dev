import React from "react";
import { render } from "@testing-library/react";
import About from "../pages/about";

jest.mock("gatsby", (): unknown => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

jest.mock("@reach/router", () => ({
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/about/" };
    }),
}));

describe("about", () => {
    it("renders", () => {
        const { asFragment } = render(<About />);

        expect(asFragment()).toMatchSnapshot();
    });
});
