import React from "react";

interface HeadProps {
    title?: string;
}

const PageHead = ({ title }: HeadProps) => {
    const pageTitle = title ?? "Chris Evans";

    return (
        <>
            <html lang="en" />
            <meta
                name="description"
                content="Chris Evans, Senior Engineering Manager at the LEGO Group, UK"
            />
            <title>{pageTitle}</title>
        </>
    );
};

export default PageHead;
