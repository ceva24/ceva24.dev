import React from "react";
import { render } from "@testing-library/react";
import PageHead from "./page-head";

describe("page-head", () => {
    it("renders", () => {
        const { asFragment } = render(<PageHead />);

        expect(asFragment()).toMatchSnapshot();
    });

    it("renders with a title", () => {
        const { asFragment } = render(<PageHead title="Test title" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
