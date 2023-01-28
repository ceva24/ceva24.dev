import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";
import PageHead from "../components/page-head";

const PurePost: React.FC<PostTemplateData> = ({ data }: PostTemplateData) => (
    <Layout showFooter>
        <article>
            <div className="mt-10 mb-5 space-y-3">
                <h2>{data.markdownRemark.frontmatter.title}</h2>
                <div>{data.markdownRemark.frontmatter.date}</div>
            </div>
            <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
        </article>
    </Layout>
);

const Post: React.FC<PostTemplateData> = (data: PostTemplateData) => (
    <PurePost {...data} />
);

const query = graphql`
    query ($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
            }
        }
    }
`;

const Head = ({ data }: PostTemplateData) => (
    <PageHead title={data.markdownRemark.frontmatter.title} />
);

export default Post;
export { Head, PurePost, query };
