import React from "react";
import { render } from "@testing-library/react";
import { PureFooter } from "./footer";

describe("footer", () => {
    it("renders", () => {
        const data: FooterData = {
            site: {
                siteMetadata: {
                    name: "Captain",
                    role: "Caveman",
                },
            },
        };

        const { asFragment } = render(<PureFooter {...data} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
