module.exports = {
    // TODO use image plugin
    // TODO go-live preparation
    siteMetadata: {
        title: "ceva24.dev",
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
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet"
    ],
}
