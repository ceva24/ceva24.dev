const path = require('path')

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
        {
            resolve: "gatsby-plugin-root-import",
            options: {
                src: path.join(__dirname, 'src'),
                static: path.join(__dirname, 'static')
            }
        },
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet"
    ],
}
