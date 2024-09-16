import React from "react";

const PageLayout: React.FC<{
    children: React.ReactNode;
    title?: string;
    metaDescription?: string;
    canonicalUrl?: string;
}> = ({ children, title, metaDescription, canonicalUrl }) => {
    return (
        <div className="container flex mx-auto min-h-screen py-10">
            <title>{title ?? "DLTx"}</title>
            <meta
                name="description"
                content={metaDescription ?? "DLTx"}
            />
            {canonicalUrl && (
                <link rel="canonical" href={`https://dltx.io${canonicalUrl}`} />
            )}
            <div className="overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
