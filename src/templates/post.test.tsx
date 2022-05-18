import React from "react";
import { render } from "@testing-library/react";
import { PurePost } from "./post";

jest.mock("gatsby", (): unknown => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

jest.mock("@reach/router", () => ({
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/posts/post-title/" };
    }),
}));

describe("post", () => {
    it("renders", () => {
        const data: PostTemplateData = {
            data: {
                markdownRemark: {
                    frontmatter: {
                        title: "Post title",
                        date: "2000-01-01",
                    },
                    html: "<p>Hello world</p>",
                },
            },
        };

        const { asFragment } = render(<PurePost {...data} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
