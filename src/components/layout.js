import React from "react"
import { css } from "@emotion/core"
import Head from "./layout/head"
import Title from "./layout/title"
import Bio from "./layout/bio"

export default ({ children }) => (
    <div css={css`
        margin: 0 auto;
        min-height: 1100px;
        min-width: 300px;
        max-width: 800px;
        padding: 2rem 0 2rem 0;
    `}>
        <Head />
        <Title />
        <Bio />
        {children}
    </div>
)
