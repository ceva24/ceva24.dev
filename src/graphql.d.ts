interface IndexPageData {
    data: {
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

interface LayoutData {
    site: {
        siteMetadata: {
            name: string;
            website: string;
            subtitle: string;
            pageDescription: string;
        };
    };
}

interface BioComponentData {
    site: {
        siteMetadata: {
            name: string;
            role: string;
        };
    };
}
