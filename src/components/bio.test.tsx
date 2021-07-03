import React from "react";
import { render } from "@testing-library/react";
import { PureBio } from "./bio";

describe("bio", () => {
    it("renders", () => {
        const data: BioComponentData = {
            site: {
                siteMetadata: {
                    name: "Captain",
                    role: "Caveman",
                },
            },
        };

        const { asFragment } = render(<PureBio {...data} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
