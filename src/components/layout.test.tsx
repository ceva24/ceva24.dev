import React from "react";
import { render } from "@testing-library/react";
import { PureLayout } from "./layout";

describe("layout", () => {
    it("renders", () => {
        const children = <p>Hello</p>;

        const { asFragment } = render(
            <PureLayout title="Title" description="Description">
                {children}
            </PureLayout>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
