import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface SocialIconProps {
    url: string;
    label: string;
    icon: IconProp;
}

const SocialIcon: React.FC<SocialIconProps> = ({
    url,
    label,
    icon,
}: SocialIconProps) => (
    <a href={url} title={url} aria-label={label} className="text-gray-800">
        <FontAwesomeIcon icon={icon} />
    </a>
);

export { SocialIcon };
