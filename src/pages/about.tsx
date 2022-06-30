import React from "react";
import { Layout } from "../components/layout";

const About: React.FC = () => {
    return (
        <Layout showFooter title="Chris Evans - About">
            <h2>About me</h2>

            <p>
                Hi! I&apos;m an Engineering Manager from the UK. I currently
                work at the LEGO Group, supporting a team of software engineers
                building great products and maintaining the systems that support
                the company&apos;s outstanding customer service.
            </p>

            <p>
                I started out in Java and then moved into back-end web
                development with Groovy/Grails. A while back I transitioned to
                JavaScript/TypeScript, Node.js and React (mainly Next.js and
                Gatsby). I&apos;ve also built up a chunk of experience in AWS
                Serverless and event-driven architecture.
            </p>

            <p>
                I&apos;m keen on automation and using it to increase teams&apos;
                capabilities over time. I&apos;m also interested in agile team
                leadership - driving change by focusing on user benefit,
                breaking things down into deliverable increments and using
                metrics to inform success. I value an open and collaborative
                approach to software development, always asking the question
                &quot;what value are we delivering?&quot;
            </p>

            <p>
                I&apos;m passionate about people - attracting and recruiting
                talented developers, doing onboarding right, and supporting
                developers&apos; careers to drive them towards success.
            </p>

            <p>
                I get satisfaction from seeing a team succeed and constantly
                improve itself, as well as knowing our work makes a difference
                to people.
            </p>

            <p>
                Please don&apos;t hesitate to{" "}
                <a href="mailto:chris@ceva24.dev">reach out to me</a> for a
                chat, to ask a question, or anything else really!
            </p>

            <h2>About this blog</h2>

            <p>
                I started this blog back in 2012 to have a bit more of a web
                presence, and to use it as a place to drop thoughts, code
                snippets, and anything else I wanted to talk about (hence the
                tagline &quot;Thoughts, code and everything in-between&quot;).
                It&apos;s fair to say I haven&apos;t made the most out of it,
                but I still like to update it every so often.
            </p>

            <p>Thanks for taking the time to check it out!</p>
        </Layout>
    );
};

export default About;
