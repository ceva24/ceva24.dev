import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import { PostListItem } from "../components/post-list-item";

const Index: React.FC<IndexPageData> = ({ data }: IndexPageData) => {
    return (
        <Layout
            title={`${data.site.siteMetadata.name} | ${data.site.siteMetadata.subtitle}`}
        >
            <h2>
                Posts <span>({data.allMarkdownRemark.totalCount})</span>
            </h2>
            <ul>
                {data.allMarkdownRemark.edges.map((edge) => (
                    <PostListItem key={edge.node.id} node={edge.node} />
                ))}
            </ul>
        </Layout>
    );
};

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
const query = graphql`
    query {
        site {
            siteMetadata {
                name
                subtitle
            }
        }
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
`;

export default Index;
export { query };
