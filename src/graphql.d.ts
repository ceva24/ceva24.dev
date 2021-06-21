interface IndexPageData {
    data: {
        site: {
            siteMetadata: {
                name: string;
                subtitle: string;
            };
        };
        allMarkdownRemark: {
            totalCount: number;
            edges: IndexPageEdge[];
        };
    };
}

interface IndexPageEdge {
    node: {
        id: string;
        frontmatter: {
            title: string;
            date: string;
        };
        fields: {
            slug: string;
            path: string;
        };
        excerpt: string;
    };
}

interface PostTemplateData {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string;
                date: string;
            };
            html: string;
        };
    };
}

interface BioComponentData {
    site: {
        siteMetadata: {
            name: string;
            subtitle: string;
        };
    };
}
