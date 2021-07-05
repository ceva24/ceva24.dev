import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery } from "gatsby";
import { Header } from "./header";
import { Footer } from "./footer";

interface LayoutProps {
    title?: string;
    children: React.ReactNode;
    showFooter?: boolean;
}

interface PureLayoutProps extends LayoutProps {
    pageDescription: string;
    name: string;
    website: string;
    subtitle: string;
}

const PureLayout: React.FC<PureLayoutProps> = (props: PureLayoutProps) => {
    const pageTitle = props.title ?? props.name;

    return (
        <div className="text-lg font-light max-w-4xl mx-auto">
            <Helmet>
                <html lang="en" />
                <meta name="description" content={props.pageDescription} />
                <title>{pageTitle}</title>
            </Helmet>

            <Header {...props} />

            <main className="px-3 my-6">{props.children}</main>

            {props.showFooter ? <Footer /> : null}
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({
    title,
    showFooter,
    children,
}: LayoutProps) => {
    const data: LayoutData = useStaticQuery(
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        graphql`
            query {
                site {
                    siteMetadata {
                        name
                        website
                        subtitle
                        pageDescription
                    }
                }
            }
        `
    );

    return (
        <PureLayout
            title={title}
            showFooter={showFooter}
            {...data.site.siteMetadata}
        >
            {children}
        </PureLayout>
    );
};

export { Layout, PureLayout };
