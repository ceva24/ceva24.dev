import React from "react"
import Helmet from "react-helmet"

export default (props) => (
    <Helmet>
        <html lang="en" />
        <title>{props.name} | {props.subtitle}</title>
    </Helmet>
)
