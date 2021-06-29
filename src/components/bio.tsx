import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "./social-icon";

const PureBio: React.FC<BioComponentData> = (data: BioComponentData) => {
    return (
        <div>
            <StaticImage
                src="../img/profile-picture.png"
                alt="Chris Evans head shot"
                quality={100}
            />
            <div>
                <h1>
                    <Link to="/">{data.site.siteMetadata.name}</Link>
                </h1>
                <div>{data.site.siteMetadata.role}</div>
                <div>
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
                        url="https://uk.linkedin.com/in/ceva24"
                    />
                    <SocialIcon
                        icon={faTwitter}
                        label="Twitter"
                        url="https://twitter.com/ceva24"
                    />
                </div>
            </div>
        </div>
    );
};

const Bio: React.FC = () => {
    const data: BioComponentData = useStaticQuery(
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

    return <PureBio {...data} />;
};

export { Bio, PureBio };