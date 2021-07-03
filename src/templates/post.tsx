import React from "react";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/layout";

const PurePost: React.FC<PostTemplateData> = ({ data }: PostTemplateData) => (
    <>
        <article>
            <div className="mt-10 mb-5 space-y-3">
                <h2 className="text-4xl uppercase font-normal">
                    {data.markdownRemark.frontmatter.title}
                </h2>

                <div>{data.markdownRemark.frontmatter.date}</div>
            </div>

            <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
        </article>
        <Link to="/">Home</Link>
    </>
);

const Post: React.FC<PostTemplateData> = (data: PostTemplateData) => (
    <Layout title={data.data.markdownRemark.frontmatter.title}>
        <PurePost {...data} />
    </Layout>
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
