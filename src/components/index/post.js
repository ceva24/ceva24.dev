import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import {Link} from "gatsby";

export default ({node}) => (
    <div key={node.id}>
        <h3 css={css`
            margin-bottom: ${rhythm(1 / 4)};
        `}>
            <Link to={node.fields.path} css={css`
                text-decoration: none;
            `}>
                {node.frontmatter.title}{" "}
            </Link>
            <span css={css`
                color: #7f8c8d;
            `}>
                — {node.frontmatter.date}
            </span>
        </h3>
        <p>{node.excerpt}</p>
    </div>
)
