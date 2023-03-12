import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";

interface NavLinkProps {
    link: string;
    text: string;
    partiallyActive?: boolean;
}

const Nav: React.FC = () => {
    const location = useLocation().pathname;

    return (
        <nav className="my-6 space-x-12 min-w-max text-center">
            <NavLink
                link="/"
                text="POSTS"
                partiallyActive={location.startsWith("/posts")}
            />
            <NavLink link="/about/" text="ABOUT" />
        </nav>
    );
};

const NavLink: React.FC<NavLinkProps> = ({
    link,
    text,
    partiallyActive,
}: NavLinkProps) => (
    <Link
        partiallyActive={partiallyActive}
        to={link}
        className="pb-2 text-black border-b hover:border-black"
        activeClassName="border-black"
    >
        {text}
    </Link>
);

export { Nav };
