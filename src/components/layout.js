import React from "react"
import Helmet from "./helmet"
import Header from "./header"
import Menu from "./menu"

export default ({ children }) => (
    <div style={{ margin: '0 auto', minHeight: 1100, maxWidth: 800, padding: '3rem' }}>
        <Helmet />
        <Header />
        <Menu />
        {children}
    </div>
)
