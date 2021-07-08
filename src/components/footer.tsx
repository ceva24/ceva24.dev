import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Footer: React.FC = () => (
    <footer>
        <div className="min-w-max text-center">
            <Link to="/">Home</Link>
        </div>

        <div className="my-8 text-center space-y-3 pt-5 border-t max-w-lg mx-auto">
            <StaticImage
                src="../img/profile-picture.png"
                alt="Chris Evans profile picture"
                quality={100}
                className="rounded-full"
            />

            <div className="font-normal">CHRIS EVANS</div>

            <div className="px-6">
                A Web Development / Systems Integration Team Leader at the
                University of York, UK
            </div>
        </div>
    </footer>
);

export { Footer };
