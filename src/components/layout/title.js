import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { css } from "@emotion/core"

export default () => (
    <header css={css`
        margin-bottom: ${rhythm(2)};
    `}>
        <h1 css={css`
            margin-bottom: 0;
        `}>
            <Link to="/" css={css`
                color: inherit;
                text-decoration: none;
            `}>ceva24.dev</Link>
        </h1>
        <p><em>Thoughts, code and everything in-between</em></p>
    </header>
)
