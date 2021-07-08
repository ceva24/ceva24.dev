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
