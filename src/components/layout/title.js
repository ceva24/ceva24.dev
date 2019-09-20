import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../../utils/typography"
import { css } from "@emotion/core"

export default (props) => (
    <header css={css`
        margin-bottom: ${rhythm(2)};
    `}>
        <h1 css={css`
            margin-bottom: 0;
        `}>
            <Link to="/" css={css`
                color: inherit;
                text-decoration: none;
            `}>{props.title}</Link>
        </h1>
        <p><em>{props.subtitle}</em></p>
    </header>
)
