module.exports = {
    plugins: [
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography",
                omitGoogleFont: true
            },
        },
        "gatsby-plugin-react-helmet",
    ],
}
