import React from "react";
import { render } from "@testing-library/react";
import { PureAbout } from "../pages/about";

jest.mock("gatsby", () => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

describe("about", () => {
    it("renders", () => {
        const { asFragment } = render(<PureAbout />);

        expect(asFragment()).toMatchSnapshot();
    });
});
