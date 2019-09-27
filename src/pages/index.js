import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "src/components/layout"
import PostListItem from "src/components/index/post-list-item"

export default ({ data }) => (
    <Layout>
        <h2>Posts</h2>
        <ul css={css`
            list-style: none;
            margin-left: 0;
        `}>
            {data.allMarkdownRemark.edges.map(({node}) => (
                <PostListItem node={node} />
            ))}
        </ul>
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
            date(formatString: "YYYY-MM-DD")
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
