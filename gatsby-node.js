const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        const slug = createFilePath({ node, getNode, trailingSlash: false });
        const path = `posts${createFilePath({
            node,
            getNode,
            trailingSlash: false,
        })}`;
        createNodeField({ node, name: "slug", value: slug });
        createNodeField({ node, name: "path", value: path });
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
            component: path.resolve("src/templates/post.js"),
            context: {
                slug: node.fields.slug,
            },
        });
    }
};

module.exports = {  onCreateNode, createPages };