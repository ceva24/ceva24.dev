module.exports = {
    // TODO subtitle as siteMetadata
    plugins: [
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography",
                omitGoogleFont: false  // TODO package font
            },
        },
        "gatsby-plugin-emotion", // TODO use rhythm units
        "gatsby-plugin-react-helmet",
    ],
}
