import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import { PostListItem } from "../components/post-list-item";

const PureIndex: React.FC<IndexPageData> = (data: IndexPageData) => {
    return (
        <ul className="px-3">
            {data.data.allMarkdownRemark.edges.map((edge) => (
                <PostListItem key={edge.node.id} node={edge.node} />
            ))}
        </ul>
    );
};

const Index: React.FC<IndexPageData> = (data: IndexPageData) => {
    return (
        <Layout
            title={`${data.data.site.siteMetadata.name} | ${data.data.site.siteMetadata.subtitle}`}
        >
            <PureIndex {...data} />
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
                    excerpt(pruneLength: 300)
                }
            }
        }
    }
`;

export default Index;
export { PureIndex, query };
