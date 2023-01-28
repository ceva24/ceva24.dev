import React from "react";
import { render } from "@testing-library/react";
import { Nav } from "./nav";

jest.mock("@gatsbyjs/reach-router", (): unknown => ({
    ...jest.requireActual("@gatsbyjs/reach-router"),
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/" };
    }),
}));

describe("nav", () => {
    it("renders", () => {
        const { asFragment } = render(<Nav />);

        expect(asFragment()).toMatchSnapshot();
    });
});
