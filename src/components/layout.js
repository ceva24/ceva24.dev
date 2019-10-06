import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import Helmet from "react-helmet"
import GlobalStyles from "src/styles/global"
import Bio from "src/components/layout/bio"

export default ({ title, children }) => (
    <div css={css`
        margin: 0 auto;
        min-width: 300px;
        max-width: 800px;
        padding: ${rhythm(3 / 2)} ${rhythm(1)};
    `}>

        <GlobalStyles />

        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>{title}</title>
        </Helmet>

        <Bio />

        {children}
    </div>
)
