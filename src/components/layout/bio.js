import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { rhythm } from "src/utils/typography"
import SocialIcon from "src/components/layout/social-icon"
import ProfilePicture from "static/profile-picture.png"

export default (props) => (
    <div css={css`
        display: flex;
        align-items: center;
        margin-bottom: ${rhythm(2)};
    `}>
        <img
            src={ProfilePicture}
            alt="Chris Evans head shot"
            css={css`
                margin-right: ${rhythm(1 / 2)};
                margin-bottom: 0;
                border-radius: 100%;
                min-height: ${rhythm(3)};
                min-width: ${rhythm(3)};
                height: ${rhythm(3)};
                width: ${rhythm(3)};
                box-shadow: none;
        `} />
        <div css={css`
            padding-left: ${rhythm(3 / 4)};
            border-left: 1px solid;
        `}>
            <h1>
                <Link to="/" css={css`
                    color: inherit;
                    &:hover {
                        color: inherit;
                    }
                `}>
                    {props.name}
                </Link>
            </h1>
            <div>A Web Development Team Leader at the University of York</div>
            <div css={css`
                @media(max-width: 768px) {
                    font-size: ${rhythm(1)};
                }
                @media(min-width: 768px) {
                    font-size: ${rhythm(4 / 5)};
                }
            `}>
                <SocialIcon icon={faEnvelope} label="Email" url="mailto:chris@ceva24.dev" />
                <SocialIcon icon={faGithub} label="Github" url="https://www.github.com/ceva24" />
                <SocialIcon icon={faLinkedin} label="LinkedIn" url="https://uk.linkedin.com/in/ceva24" />
                <SocialIcon icon={faTwitter} label="Twitter" url="https://twitter.com/ceva24" />
            </div>
        </div>
    </div>
)
