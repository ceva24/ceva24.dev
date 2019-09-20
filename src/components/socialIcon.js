import React from "react"
import FontAwesome from "react-fontawesome"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default (props) => (
    <a href={props.url} title={props.url} css={css`
        color: inherit;
        margin-right: ${rhythm(1 / 2)};
        &:hover {
            color: #0071bc;
        }
    `}>
        <FontAwesome name={props.name} />
    </a>
)
