import React from "react";
import { render } from "@testing-library/react";
import { Layout } from "./layout";

jest.mock("@gatsbyjs/reach-router", (): unknown => ({
    ...jest.requireActual("@gatsbyjs/reach-router"),
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/" };
    }),
}));

describe("layout", () => {
    it("renders", () => {
        const children = <p>Hello</p>;

        const { asFragment } = render(
            <Layout title="Title">{children}</Layout>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with a footer", () => {
        const children = <p>Hello</p>;

        const { asFragment } = render(
            <Layout showFooter title="Title">
                {children}
            </Layout>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
