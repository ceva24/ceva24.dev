import React from "react";
import { Header } from "./header";
import { Nav } from "./nav";
import { Footer } from "./footer";

interface LayoutProps {
    showFooter?: boolean;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    showFooter,
    children,
}: LayoutProps) => {
    return (
        <div className="text-lg font-light max-w-4xl mx-auto">
            <Header />

            <Nav />

            <main className="px-3 mb-6">{children}</main>

            {showFooter ? <Footer /> : null}
        </div>
    );
};

export { Layout };
