import React from "react";
import { render } from "@testing-library/react";
import { PureLayout } from "./layout";

describe("layout", () => {
    it("renders", () => {
        const bio = <div>Bio</div>;
        const children = <p>Hello</p>;

        const { asFragment } = render(
            <PureLayout title="Title" description="Description" bio={bio}>
                {children}
            </PureLayout>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
