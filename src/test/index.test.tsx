import React from "react";
import { render } from "@testing-library/react";
import { PureIndex } from "../pages/index";

jest.mock("gatsby", (): unknown => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

jest.mock("@gatsbyjs/reach-router", (): unknown => ({
    ...jest.requireActual("@gatsbyjs/reach-router"),
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: "/" };
    }),
}));

describe("index", () => {
    it("renders", () => {
        const data: IndexPageData = {
            data: {
                allMarkdownRemark: {
                    totalCount: 1,
                    edges: [
                        {
                            node: {
                                id: "abc",
                                frontmatter: {
                                    title: "Post title",
                                    date: "2000-01-01",
                                },
                                fields: {
                                    slug: "post-title",
                                    path: "posts/post-title",
                                },
                                excerpt: "This is a post...",
                            },
                        },
                    ],
                },
            },
        };

        const { asFragment } = render(<PureIndex {...data} />);

        expect(asFragment()).toMatchSnapshot();
    });
});
