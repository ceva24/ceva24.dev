import React from "react"
import { Link } from "gatsby"

const ListLink = props => (
    <li style={{ display: "inline-block", margin: "0 1rem" }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default () => (
        <ul style={{  padding: "0.75rem 0", margin: "2rem 0", borderTop: "1px solid gray", borderBottom: "1px solid gray" }}>
            <ListLink to="/">HOME</ListLink>
            <ListLink to="/about">ABOUT</ListLink>
        </ul>
)
