import { graphql, Link } from "gatsby";
import { css } from "@emotion/react";
import { rhythm } from "../utils/typography";
import { Layout } from "../components/layout";
import { PostDate } from "../components/post-date";

const Post: React.FC<PostTemplateData> = ({ data }: PostTemplateData) => (
    <Layout title={data.markdownRemark.frontmatter.title}>
        <h2
            className="post-title"
            css={css`
                margin-bottom: 0;
            `}
        >
            {data.markdownRemark.frontmatter.title}
        </h2>
        <div
            css={css`
                margin-bottom: ${rhythm(3 / 4)};
            `}
        >
            <PostDate>{data.markdownRemark.frontmatter.date}</PostDate>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        <Link className="home-link" to="/">
            Home
        </Link>
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
