import { css } from "@emotion/react";
import { Link } from "gatsby";
import { rhythm } from "../styles/typography";
import { PostDate } from "./post-date";

const PostListItem: React.FC<IndexPageEdge> = ({ node }: IndexPageEdge) => (
    <li
        key={node.id}
        className="post"
        css={css`
            margin-bottom: ${rhythm(1)};
        `}
    >
        <div
            css={css`
                display: flex;
            `}
        >
            <h3
                css={css`
                    margin-bottom: ${rhythm(1 / 3)};
                `}
            >
                <Link
                    to={`/${node.fields.path}`}
                    css={css`
                        text-decoration: none;
                    `}
                >
                    {node.frontmatter.title}
                </Link>
            </h3>
            <div
                css={css`
                    flex-grow: 2;
                    text-align: right;
                    padding-left: ${rhythm(3 / 4)};
                `}
            >
                <PostDate>{node.frontmatter.date}</PostDate>
            </div>
        </div>
        <p>{node.excerpt}</p>
    </li>
);

export { PostListItem };
