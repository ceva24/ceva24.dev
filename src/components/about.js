import React from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

const ListLink = props => (
    <li css={css`
        display: inline-block;
        margin: 0 1rem;
    `}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default () => (
    <ul css={css`
        padding: 0.75rem 0;
        margin: 2rem 0;
        border-top: 1px solid gray;
        border-bottom: 1px solid gray;
    `}>
        <ListLink to="/">HOME</ListLink>
    </ul>
)
