const path = require("path");

module.exports = {
    siteMetadata: {
        name: "Chris Evans",
        website: "ceva24.dev",
        subtitle: "Thoughts, code and everything in-between",
        role: "A Web Development / Systems Integration Team Leader at the University of York",
        pageDescription:
            "Chris Evans, a Web Development / Systems Integration Team Leader at the University of York",
    },
    plugins: [
        "gatsby-plugin-postcss",
        {
            resolve: "gatsby-plugin-purgecss",
            options: {
                tailwind: true,
                ignore: [
                    "@fortawesome/fontawesome-svg-core/styles.css",
                    "src/styles/highlights.css",
                ],
            },
        },
        "gatsby-plugin-react-helmet",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: path.join(__dirname, "/posts"),
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 800,
                        },
                    },
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
                background_color: "#ffffff",
                theme_color: "#c0392b",
                display: "standalone",
                icon: "src/img/favicon.png",
                icon_options: {
                    purpose: "any maskable",
                },
                cache_busting_mode: "none",
            },
        },
        "gatsby-plugin-offline",
    ],
};
