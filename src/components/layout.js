import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { css, Global } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import Bio from "src/components/layout/bio"
import Helmet from "react-helmet";

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
                h1 {
                    font-size: ${rhythm(4 / 5)}; 
                    font-family: 'Source Sans Pro',sans-serif;
                    margin-bottom: 0;
                }
                a { color: #c0392b; text-decoration: none; }
                a:hover { color: #e74c3c; }
                img { box-shadow: 0 1px 4px #7f8c8d; }
            `} />

            <Helmet>
                <html lang="en" />
                <title>{name} | {subtitle}</title>
            </Helmet>

            <Bio name={name} />

            {children}
        </div>
    )
}
