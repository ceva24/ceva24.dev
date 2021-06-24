import { graphql, useStaticQuery, Link } from "gatsby";
import { css } from "@emotion/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { rhythm } from "../../utils/typography";
import ProfilePicture from "../../../static/profile-picture.png";
import { SocialIcon } from "./social-icon";

const Bio = () => {
    const data: BioComponentData = useStaticQuery(
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        graphql`
            query {
                site {
                    siteMetadata {
                        name
                        subtitle
                    }
                }
            }
        `
    );

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                margin-bottom: ${rhythm(2)};
                @media (max-width: 768px) {
                    justify-content: center;
                }
            `}
        >
            <img
                src={ProfilePicture as string}
                alt="Chris Evans head shot"
                css={css`
                    margin-right: ${rhythm(1 / 2)};
                    margin-bottom: 0;
                    border-radius: 100%;
                    min-height: 78px;
                    min-width: 78px;
                    height: 78px;
                    width: 78px;
                    box-shadow: none;
                `}
            />
            <div
                css={css`
                    padding-left: ${rhythm(3 / 4)};
                    border-left: 1px solid;
                `}
            >
                <h1>
                    <Link
                        to="/"
                        className="bio-link"
                        css={css`
                            color: inherit;
                            &:hover {
                                color: inherit;
                            }
                        `}
                    >
                        {data.site.siteMetadata.name}
                    </Link>
                </h1>
                <div>
                    A Web Development / Systems Integration Team Leader at the
                    University of York
                </div>
                <div
                    css={css`
                        @media (max-width: 768px) {
                            font-size: ${rhythm(1)};
                        }
                        @media (min-width: 768px) {
                            font-size: ${rhythm(4 / 5)};
                        }
                    `}
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

export { Bio };
