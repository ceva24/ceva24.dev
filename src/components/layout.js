import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
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
            <Head name={name} subtitle={subtitle} />
            <Bio name={name} />
            {children}
        </div>
    )
}
