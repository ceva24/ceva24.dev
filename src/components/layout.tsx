import React from "react";
import Helmet from "react-helmet";
import { graphql, useStaticQuery, Link } from "gatsby";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "./social-icon";

interface LayoutProps {
    title?: string;
    children: React.ReactNode;
}

interface PureLayoutProps extends LayoutProps {
    pageDescription: string;
    name: string;
    website: string;
    subtitle: string;
}

const PureLayout: React.FC<PureLayoutProps> = ({
    title,
    name,
    website,
    subtitle,
    pageDescription,
    children,
}: PureLayoutProps) => {
    const pageTitle = title ?? name;

    return (
        <div className="text-lg font-light">
            <Helmet>
                <html lang="en" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="description" content={pageDescription} />
                <title>{pageTitle}</title>
            </Helmet>

            <header className="max-w-6xl mx-auto border-b">
                <div className="my-8 text-center space-y-5">
                    <h1 className="text-7xl">
                        <Link to="/">{name}</Link>
                    </h1>

                    <div>
                        <strong>{website}</strong> | {subtitle}
                    </div>

                    <div
                        className="space-x-8 text-gray-700 text-2xl"
                        aria-label="Contact"
                    >
                        <SocialIcon
                            icon={faEnvelope}
                            label="Email"
                            url="mailto:chris@ceva24.dev"
                        />
                        <SocialIcon
                            icon={faGithub}
                            label="Github"
                            url="https://www.github.com/ceva24"
                        />
                        <SocialIcon
                            icon={faLinkedin}
                            label="LinkedIn"
                            url="https://www.linkedin.com/in/ceva24"
                        />
                        <SocialIcon
                            icon={faTwitter}
                            label="Twitter"
                            url="https://twitter.com/ceva24"
                        />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-3 my-6">{children}</main>
        </div>
    );
};

const Layout: React.FC<LayoutProps> = ({ title, children }: LayoutProps) => {
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
            name={data.site.siteMetadata.name}
            website={data.site.siteMetadata.website}
            subtitle={data.site.siteMetadata.subtitle}
            pageDescription={data.site.siteMetadata.pageDescription}
        >
            {children}
        </PureLayout>
    );
};

export { Layout, PureLayout };
