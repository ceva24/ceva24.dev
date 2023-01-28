import React from "react";
import { Link } from "gatsby";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "./social-icon";

const Header: React.FC = () => (
    <header className="border-b">
        <div className="my-8 text-center space-y-5">
            <h1 className="text-6xl">
                <Link to="/" className="text-black">
                    Chris Evans
                </Link>
            </h1>

            <div className="px-6">
                <strong>ceva24.dev</strong> | Thoughts, code and everything
                in-between
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
            </div>
        </div>
    </header>
);

export { Header };
