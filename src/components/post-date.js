import React from "react"
import { css } from "@emotion/core"

export default ({children}) => (
    <strong css={css`
        color: #636e72;
    `}>
        {children}
    </strong>
)
