import React from "react";
import { render } from "@testing-library/react";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { SocialIcon } from "./social-icon";

describe("social icon", () => {
    it("renders", () => {
        const { asFragment } = render(
            <SocialIcon
                url="https://twitch.tv"
                label="Twitch"
                icon={faTwitch}
            />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
