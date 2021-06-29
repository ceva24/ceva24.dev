import React from "react";
import { render } from "@testing-library/react";
import { PureIndex } from "../pages/index";

jest.mock("gatsby", () => {
    return {
        ...jest.requireActual("gatsby"),
        graphql: jest.fn(),
        StaticQuery: jest.fn(),
        useStaticQuery: jest.fn(),
    };
});

describe("post", () => {
    it("renders", () => {
        const data: IndexPageData = {
            data: {
                site: {
                    siteMetadata: {
                        name: "Site name",
                        subtitle: "Site subtitle",
                    },
                },
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
