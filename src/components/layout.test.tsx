import React from "react";
import { render } from "@testing-library/react";
import { PureLayout } from "./layout";

describe("layout", () => {
    it("renders", () => {
        const children = <p>Hello</p>;

        const { asFragment } = render(
            <PureLayout
                title="Title"
                pageDescription="Description"
                name="Name"
                website="Website"
                subtitle="Subtitle"
            >
                {children}
            </PureLayout>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
