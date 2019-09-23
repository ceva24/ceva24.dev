import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { css, Global } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import Head from "src/components/layout/head"
import Bio from "src/components/layout/bio"

export default ({ children }) => {

    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                name
                subtitle
              }
            }
          }
        `
    )

    const name = data.site.siteMetadata.name
    const subtitle = data.site.siteMetadata.subtitle

    return (
        <div css={css`
            margin: 0 auto;
            min-width: 300px;
            max-width: 800px;
            padding: ${rhythm(3 / 2)} ${rhythm(1)};
        `}>
            <Global styles={css`
                h1 { font-size: ${rhythm(1)} }
                h2 { font-size: ${rhythm(4 / 5)} }
            `} />
            <Head name={name} subtitle={subtitle} />
            <Bio name={name} />
            {children}
        </div>
    )
}
