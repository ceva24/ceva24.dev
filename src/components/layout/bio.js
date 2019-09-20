import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"
import Avatar from "../../../static/avatar.png"
import SocialIcon from "../socialIcon"

export default () => (

    <div css={css`
            display: flex;
            margin-bottom: ${rhythm(2)};
    `}>
        <img
            src={Avatar}
            css={css`
                margin-right: ${rhythm(1 / 2)};
                margin-bottom: 0;
                border-radius: 100%;
                height: ${rhythm(3)};
                width: ${rhythm(3)};
        `} />
        <div css={css`
            padding-left: ${rhythm(3 / 4)};
            border-left: 1px solid;
        `}
        >
            <strong>Chris Evans</strong>
            <div>A Web Development Team Leader at the University of York</div>
            <div>
                <SocialIcon name="envelope" url="mailto:chris@ceva24.dev" />
                <SocialIcon name="github" url="https://www.github.com/ceva24" />
                <SocialIcon name="linkedin" url="https://uk.linkedin.com/in/ceva24" />
                <SocialIcon name="twitter" url="https://twitter.com/ceva24" />
            </div>
        </div>
    </div>
)
