const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        const fullPath = createFilePath({
            node,
            getNode,
        });

        const slug = path.basename(fullPath);
        const postPath = `posts/${slug}/`;

        createNodeField({ node, name: "slug", value: slug });
        createNodeField({ node, name: "path", value: postPath });
    }
};

const createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            path
                            slug
                        }
                    }
                }
            }
        }
    `);

    for (const edge of result.data.allMarkdownRemark.edges) {
        const node = edge.node;
        createPage({
            path: node.fields.path,
            component: path.resolve("src/templates/post.tsx"),
            context: {
                slug: node.fields.slug,
            },
        });
    }
};

module.exports = { onCreateNode, createPages };
