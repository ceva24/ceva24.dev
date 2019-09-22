import React from "react"
import { graphql, Link } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "src/utils/typography"
import Layout from "src/components/layout"

export default ({ data }) => (
    <Layout>
        <h2 css={css`
            margin-bottom: 0;
        `}>
            {data.markdownRemark.frontmatter.title}
        </h2>
        <div css={css`
            color: #7f8c8d;
            margin-bottom: ${rhythm(3 / 4)};
        `}>
            <strong>{data.markdownRemark.frontmatter.date}</strong>
        </div>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        <Link to="/">Home</Link>
    </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
