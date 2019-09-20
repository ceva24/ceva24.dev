import React from "react"
import { css } from "@emotion/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { rhythm } from "../utils/typography"

export default (props) => (
    <a href={props.url} title={props.url} css={css`
        color: inherit;
        margin-right: ${rhythm(1 / 2)};
        &:hover {
            color: #0071bc;
        }
    `}>
        <FontAwesomeIcon icon={props.icon} />
    </a>
)
