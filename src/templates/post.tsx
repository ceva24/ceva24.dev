import React from "react";
import { graphql, Link } from "gatsby";
import { Layout } from "../components/layout";
import { PostDate } from "../components/post-date";

const PurePost: React.FC<PostTemplateData> = (data: PostTemplateData) => (
    <>
        <h2>{data.data.markdownRemark.frontmatter.title}</h2>
        <div>
            <PostDate>{data.data.markdownRemark.frontmatter.date}</PostDate>
        </div>

        <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: data.data.markdownRemark.html }}
        />
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
