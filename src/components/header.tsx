import React from "react";
import { Link } from "gatsby";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "./social-icon";

interface HeaderProps {
    name: string;
    subtitle: string;
    website: string;
}

const Header: React.FC<HeaderProps> = ({
    name,
    subtitle,
    website,
}: HeaderProps) => (
    <header className="border-b">
        <div className="my-8 text-center space-y-5">
            <h1 className="text-7xl">
                <Link to="/" className="text-black">
                    {name}
                </Link>
            </h1>

            <div>
                <strong>{website}</strong> | {subtitle}
            </div>

            <div className="space-x-8 text-2xl" aria-label="Contact">
                <SocialIcon
                    icon={faEnvelope}
                    label="Email"
                    url="mailto:chris@ceva24.dev"
                />
                <SocialIcon
                    icon={faGithub}
                    label="Github"
                    url="https://www.github.com/ceva24"
                />
                <SocialIcon
                    icon={faLinkedin}
                    label="LinkedIn"
                    url="https://www.linkedin.com/in/ceva24"
                />
                <SocialIcon
                    icon={faTwitter}
                    label="Twitter"
                    url="https://twitter.com/ceva24"
                />
            </div>
        </div>
    </header>
);

export { Header };
