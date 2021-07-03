import { render } from "@testing-library/react";
import React from "react";
import { PostListItem } from "./post-list-item";

describe("post list item", () => {
    it("renders", () => {
        const indexPageEdge = {
            node: {
                id: "1",
                frontmatter: {
                    title: "post title",
                    date: "01-01-2020",
                },
                fields: {
                    slug: "post-title",
                    path: "posts/post-title",
                },
                excerpt: "This is a post",
            },
        };

        const { asFragment } = render(
            <PostListItem node={indexPageEdge.node} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
