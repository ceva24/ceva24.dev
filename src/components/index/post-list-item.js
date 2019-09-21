import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import {Link} from "gatsby";

export default ({node}) => (
    <li key={node.id} css={css`
        margin-bottom: ${rhythm(1)}
    `}>
        <div css={css`
            display: flex;
        `}>
            <h3 css={css`
                margin-bottom: ${rhythm(1 / 3)};
            `}>
                <Link to={node.fields.path} css={css`
                    text-decoration: none;
                `}>
                    {node.frontmatter.title}
                </Link>
            </h3>
            <div css={css`
                flex-grow: 2;
                text-align: right;
                color: #7f8c8d;
            `}>
                <strong>{node.frontmatter.date}</strong>
            </div>
        </div>
        <p>{node.excerpt}</p>
    </li>
)
