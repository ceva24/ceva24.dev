import React from "react";
import { render } from "@testing-library/react";
import { PureBio } from "./bio";

describe("bio", () => {
    it("renders", () => {
        const data: BioComponentData = {
            site: {
                siteMetadata: {
                    name: "Captain",
                    description: "Caveman",
                },
            },
        };

        const { asFragment } = render(<PureBio site={data.site} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
