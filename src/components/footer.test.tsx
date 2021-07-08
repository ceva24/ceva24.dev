import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "./footer";

describe("footer", () => {
    it("renders", () => {
        const { asFragment } = render(<Footer />);

        expect(asFragment()).toMatchSnapshot();
    });
});
