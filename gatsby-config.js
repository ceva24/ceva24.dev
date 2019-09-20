module.exports = {
    // TODO subtitle etc. as siteMetadata
    // TODO package fontawesome
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
