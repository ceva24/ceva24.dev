import React from "react";
import { graphql, Link } from "gatsby";
import { Layout } from "../layout";
import { PostDate } from "../components/post-date";

const Post: React.FC<PostTemplateData> = ({ data }: PostTemplateData) => (
    <Layout title={data.markdownRemark.frontmatter.title}>
        <h2>{data.markdownRemark.frontmatter.title}</h2>
        <div>
            <PostDate>{data.markdownRemark.frontmatter.date}</PostDate>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        <Link to="/">Home</Link>
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
export { query };
