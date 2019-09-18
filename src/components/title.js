import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

export default () => (
    <header>
        <h1 css={css`
        margin-bottom: 0;
        `}>
            <Link to="/" css={css`
                color: inherit;
                text-decoration: none;
            `}>Chris Evans</Link>
        </h1>
        <p><em>Thoughts, code and everything in-between</em></p>
    </header>
)
