import React from "react";
import { render } from "@testing-library/react";
import { PostDate } from "./post-date";

describe("post date", () => {
    it("renders", () => {
        const date = "2000-01-01";

        const { asFragment } = render(<PostDate>{date}</PostDate>);

        expect(asFragment()).toMatchSnapshot();
    });
});
