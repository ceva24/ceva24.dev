import React from "react"
import FontAwesome from "react-fontawesome"
import { css } from "@emotion/core"
import { rhythm } from "../../utils/typography"
import Avatar from "../../../static/avatar.png"

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
                height: 80px;
                width: 80px;
        `} />
        <div>
            <strong>Chris Evans</strong>
            <div>A Web Development Team Leader at the University of York</div>
            <div><FontAwesome name="envelope" /><FontAwesome name="github" /><FontAwesome name="linkedin" /><FontAwesome name="twitter" /></div>
        </div>
    </div>
)
