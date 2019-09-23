module.exports = {
    // TODO go-live preparation
    // TODO prism
    siteMetadata: {
        name: "Chris Evans",
        subtitle: "Thoughts, code and everything in-between"
    },
    plugins: [
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography",
                omitGoogleFont: true
            },
        },
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                src: `${__dirname}/src`,
                static: `${__dirname}/static`
            }
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/posts`
            }
        },
        "gatsby-transformer-remark",
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet"
    ],
}
