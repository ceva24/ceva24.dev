import React from "react"
import Helmet from "react-helmet"
import Header from "./header"
import Menu from "./menu"

export default ({ children }) => (
    <div style={{ backgroundColor: 'white', margin: '0 auto', minHeight: 1100, maxWidth: 800, padding: '3rem' }}>
        <Helmet>
            <title>Chris Evans | Thoughts, code and everything in-between</title>
        </Helmet>
        <Header />
        <Menu />
        {children}
    </div>
)
