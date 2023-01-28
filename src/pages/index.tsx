import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import PageHead from "../components/page-head";
import { PostListItem } from "../components/post-list-item";

const PureIndex: React.FC<IndexPageData> = (data: IndexPageData) => (
    <Layout>
        <ul className="list-none">
            {data.data.allMarkdownRemark.edges.map((edge) => (
                <PostListItem key={edge.node.id} node={edge.node} />
            ))}
        </ul>
    </Layout>
);

const Index: React.FC<IndexPageData> = (data: IndexPageData) => (
    <PureIndex {...data} />
);

const query = graphql`
    query {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date
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

const Head = () => <PageHead />;

export default Index;
export { Head, PureIndex, query };
