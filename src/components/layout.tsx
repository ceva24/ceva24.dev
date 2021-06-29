import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { Bio } from "./bio";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

interface PureLayoutProps extends LayoutProps {
    description: string;
    bio: React.ReactElement;
}

const PureLayout: React.FC<PureLayoutProps> = ({
    title,
    description,
    bio,
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

        {bio}

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

    const bio = <Bio />;

    return (
        <PureLayout
            title={title}
            description={data.site.siteMetadata.pageDescription}
            bio={bio}
        >
            {children}
        </PureLayout>
    );
};

export { Layout, PureLayout };
