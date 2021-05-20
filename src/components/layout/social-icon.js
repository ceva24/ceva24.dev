import React from "react"
import { css } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { rhythm } from "src/utils/typography"

const SocialIcon = (props) => (
    <a href={props.url} title={props.url} aria-label={props.label} css={css`
        color: inherit;
        margin-right: ${rhythm(1 / 2)};
    `}>
        <FontAwesomeIcon icon={props.icon} />
    </a>
)

export default SocialIcon