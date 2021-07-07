import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { Layout } from "../components/layout";

const PureAbout: React.FC = () => (
    <>
        <h2>About me</h2>

        <p>
            Hi! I&apos;m a Development Team Lead from York, UK. I currently work
            at the University of York, leading a team of developers building
            great products and maintaining the systems that support the
            outstanding teaching and learning delivered by the University.
        </p>

        <div className="max-w-lg mx-auto mb-5">
            <figure>
                <StaticImage
                    src="../img/chris-evans.jpg"
                    alt="Chris Evans"
                    quality={90}
                    className="border-4"
                />
                <figcaption className="italic text-gray-500">
                    I should really find a more up-to-date picture
                </figcaption>
            </figure>
        </div>

        <p>
            I started out in Java and then moved into back-end web development
            with Groovy/Grails. A while back I transitioned to
            JavaScript/TypeScript, Node.js and React (mainly Next.js and
            Gatsby). I&apos;ve also built up a chunk of experience in AWS
            Serverless and event-driven architecture.
        </p>

        <p>
            I&apos;m really keen on automation and using it to enhance
            teams&apos; capabilities - I take full advantage of GitHub workflows
            both at work and in personal projects!
        </p>

        <p>
            I&apos;m also interested in agile team leadership - driving change
            by focusing on user benefit, breaking things down into deliverable
            increments and using metrics to inform success. I value an open and
            collaborative approach to software development, always asking the
            question &quot;what value are we delivering?&quot;
        </p>

        <p>
            I&apos;m passionate about people - attracting and recruiting the
            best talent, doing onboarding right, and supporting developers&apos;
            careers to drive them towards success.
        </p>

        <p>
            Please don&apos;t hesitate to{" "}
            <a href="mailto:chris@ceva24.dev">reach out to me</a> for a chat, to
            ask a question, or anything else really!
        </p>

        <h2>About this blog</h2>

        <p>
            I started this blog back in 2012 to have a bit more of a web
            presence, and to use it as a place to drop thoughts, code snippets,
            and anything else I wanted to talk about (hence the tagline
            &quot;Thoughts, code and everything in-between&quot;). It&apos;s
            fair to say I haven&apos;t made the most out of it, but I still like
            to update it every so often.
        </p>

        <p>Thanks for taking the time to check it out!</p>
    </>
);

const About: React.FC = () => {
    return (
        <Layout showFooter>
            <PureAbout />
        </Layout>
    );
};

export default About;
export { PureAbout };
