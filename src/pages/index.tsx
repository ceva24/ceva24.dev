import { graphql } from "gatsby";
import { css } from "@emotion/react";
import { Layout } from "../components/layout";
import { PostListItem } from "../components/index/post-list-item";

const Index: React.FC<IndexPageData> = ({ data }: IndexPageData) => (
    <Layout
        title={`${data.site.siteMetadata.name} | ${data.site.siteMetadata.subtitle}`}
    >
        <h2>
            Posts{" "}
            <span className="secondary-description">
                ({data.allMarkdownRemark.totalCount})
            </span>
        </h2>
        <ul
            css={css`
                list-style: none;
                margin-left: 0;
            `}
        >
            {data.allMarkdownRemark.edges.map(({ node }) => (
                <PostListItem key={node.id} node={node} />
            ))}
        </ul>
    </Layout>
);

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