import { css } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { rhythm } from "../../utils/typography";

type SocialIconProps = {
    url: string;
    label: string;
    icon: IconProp;
};

const SocialIcon = ({ url, label, icon }: SocialIconProps) => (
    <a
        href={url}
        title={url}
        aria-label={label}
        css={css`
            color: inherit;
            margin-right: ${rhythm(1 / 2)};
        `}
    >
        <FontAwesomeIcon icon={icon} />
    </a>
);

export {SocialIcon };
