const path = require("path");

module.exports = {
    siteMetadata: {
        name: "Chris Evans",
        subtitle: "Thoughts, code and everything in-between",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-typography",
            options: {
                pathToConfigModule: "src/utils/typography",
                omitGoogleFont: true,
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: path.join(__dirname, "/posts"),
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-highlights",
                        options: {
                            scopePrefix: "syntax--",
                        },
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-66779785-4",
                anonymize: true,
                respectDNT: true,
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "ceva24.dev",
                lang: "en",
                start_url: "/",
                display: "standalone",
                icon: "static/favicon.png",
                cache_busting_mode: "none",
            },
        },
        "gatsby-plugin-emotion",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-offline",
    ],
};
