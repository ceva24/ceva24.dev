import React from "react"
import { css } from "@emotion/core"
import Helmet from "./helmet"
import Title from "./title"
import About from "./about"

export default ({ children }) => (
    <div>
        <div css={css`
            margin: 0 auto;
            min-height: 1100px;
            min-width: 300px;
            max-width: 800px;
        `}>
            <Helmet />
            <div css={css`
                padding: 2rem 0 2rem 0
            `}>
                <Title />
                <About />
                {children}
            </div>
        </div>
    </div>
)
