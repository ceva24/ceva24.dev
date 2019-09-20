module.exports = {
    // TODO subtitle etc. as siteMetadata
    // TODO use image plugin
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
