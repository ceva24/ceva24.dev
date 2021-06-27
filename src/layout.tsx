import React from "react";
import Helmet from "react-helmet";
import { Bio } from "./components/bio";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }: LayoutProps) => (
    <div>
        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta
                name="description"
                content="Chris Evans, a Web Development / Systems Integration Team Leader at the University of York"
            />
            <title>{title}</title>
        </Helmet>

        <Bio />

        {children}
    </div>
);

export { Layout };
