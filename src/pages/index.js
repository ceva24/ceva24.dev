import React from "react"
import { graphql } from "gatsby"
import Layout from "src/components/layout"
import Post from "src/components/index/post"

export default ({ data }) => (
    <Layout>
        <h2>Posts</h2>
        <div>
            {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post node={node} />
            ))}
        </div>
    </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
            path
          }
          excerpt
        }
      }
    }
  }
`
