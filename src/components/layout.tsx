import { css } from "@emotion/react";
import Helmet from "react-helmet";
import { rhythm } from "../utils/typography";
import { GlobalStyles } from "../styles/global";
import { Bio } from "./layout/bio";

interface LayoutProps {
    title: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }: LayoutProps) => (
    <div
        css={css`
            margin: 0 auto;
            min-width: 300px;
            max-width: 800px;
            padding: ${rhythm(3 / 2)} ${rhythm(1)};
        `}
    >
        <GlobalStyles />

        <Helmet>
            <html lang="en" />
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{title}</title>
        </Helmet>

        <Bio />

        {children}
    </div>
);

export { Layout };
