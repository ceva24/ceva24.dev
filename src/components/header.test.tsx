import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./header";

describe("header", () => {
    it("renders", () => {
        const { asFragment } = render(
            <Header name="Name" subtitle="Subtitle" website="Website" />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
