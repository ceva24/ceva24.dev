import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const PureFooter: React.FC<FooterData> = (data: FooterData) => {
    const name = data.site.siteMetadata.name;

    return (
        <footer className="mt-5 border-t max-w-lg mx-auto">
            <div className="my-8 text-center space-y-3">
                <StaticImage
                    src="../img/profile-picture.png"
                    alt={name}
                    quality={100}
                    className="rounded-full"
                />

                <div className="font-normal">{name.toUpperCase()}</div>

                <div className="px-6">{data.site.siteMetadata.role}</div>
            </div>
        </footer>
    );
};

const Footer: React.FC = () => {
    const data: FooterData = useStaticQuery(
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        graphql`
            query {
                site {
                    siteMetadata {
                        name
                        role
                    }
                }
            }
        `
    );

    return <PureFooter {...data} />;
};

export { Footer, PureFooter };