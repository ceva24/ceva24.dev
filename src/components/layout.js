import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import Head from "src/components/layout/head"
import Title from "src/components/layout/title"
import Bio from "src/components/layout/bio"

export default ({ children }) => {

    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
                subtitle
                name
              }
            }
          }
        `
    )

    const title = data.site.siteMetadata.title
    const subtitle = data.site.siteMetadata.subtitle
    const name = data.site.siteMetadata.name

    return (
        <div css={css`
            margin: 0 auto;
            min-width: 300px;
            max-width: 800px;
            padding: ${rhythm(3 / 2)} ${rhythm(1)};
        `}>
            <Head title={title} subtitle={subtitle} />
            <Title title={title} subtitle={subtitle} />
            <Bio name={name} />
            {children}
        </div>
    )
}
