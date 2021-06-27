import { css, Global } from "@emotion/react";
import { rhythm } from "./typography";

const GlobalStyles = () => (
    <Global
        styles={css`
            @media (max-width: 768px) {
                body {
                    font-size: ${rhythm(7 / 10)};
                }
                h1 {
                    font-size: ${rhythm(1)};
                }
                h2 {
                    font-size: ${rhythm(1)};
                }
                h3 {
                    font-size: ${rhythm(4 / 5)};
                }
            }
            @media (min-width: 768px) {
                h1 {
                    font-size: ${rhythm(4 / 5)};
                }
            }
            h1 {
                font-family: "Source Sans Pro", sans-serif;
                margin-bottom: 0;
            }
            a {
                color: #c0392b;
                text-decoration: none;
            }
            a:hover {
                color: #e74c3c;
            }
            img {
                box-shadow: 0 1px 4px #7f8c8d;
            }
            .secondary-description {
                color: #636e72;
            }
        `}
    />
);

export { GlobalStyles };
