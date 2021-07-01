import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

interface PureLayoutProps extends LayoutProps {
    description: string;
}

const PureLayout: React.FC<PureLayoutProps> = ({
    title,
    description,
    children,
}: PureLayoutProps) => (
    <div>
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Helmet>

        {children}
    </div>
);

const Layout: React.FC<LayoutProps> = ({ title, children }: LayoutProps) => {
    const data: LayoutData = useStaticQuery(
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        graphql`
            query {
                site {
                    siteMetadata {
                        pageDescription
                    }
                }
            }
        `
    );

    return (
        <PureLayout
            title={title}
            description={data.site.siteMetadata.pageDescription}
        >
            {children}
        </PureLayout>
    );
};

export { Layout, PureLayout };
