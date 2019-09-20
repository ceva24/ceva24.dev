import React from "react"
import FontAwesome from "react-fontawesome"
import { css } from "@emotion/core"

export default (props) => (
    <a href={props.url} title={props.url} css={css`
        color: inherit;
        margin-right: 0.5rem;
        &:hover {
            color: #0071bc;
        }
    `}>
        <FontAwesome name={props.name} />
    </a>
)
