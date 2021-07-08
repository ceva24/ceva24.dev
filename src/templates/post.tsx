import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/layout";

const PurePost: React.FC<PostTemplateData> = ({ data }: PostTemplateData) => (
    <Layout showFooter title={data.markdownRemark.frontmatter.title}>
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

// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
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

export default Post;
export { PurePost, query };
