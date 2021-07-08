import React from "react";
import Helmet from "react-helmet";
import { Header } from "./header";
import { Nav } from "./nav";
import { Footer } from "./footer";

interface LayoutProps {
    title?: string;
    showFooter?: boolean;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    title,
    showFooter,
    children,
}: LayoutProps) => {
    const pageTitle = title ?? "Chris Evans";

    return (
        <div className="text-lg font-light max-w-4xl mx-auto">
            <Helmet>
                <html lang="en" />
                <meta
                    name="description"
                    content="Chris Evans, a Web Development / Systems Integration Team Leader at the University of York, UK"
                />
                <title>{pageTitle}</title>
            </Helmet>

            <Header />

            <Nav />

            <main className="px-3 mb-6">{children}</main>

            {showFooter ? <Footer /> : null}
        </div>
    );
};

export { Layout };
