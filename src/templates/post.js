import React from "react"
import { Link } from "gatsby"
import Layout from "src/components/layout"

export default ({ data }) => (
    <Layout>
        <h2>{data.markdownRemark.frontmatter.title}</h2>
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
      }
    }
  }
`
