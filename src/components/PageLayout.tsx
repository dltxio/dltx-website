import React from "react";

const PageLayout: React.FC<{
    children: React.ReactNode;
    title?: string;
    metaDescription?: string;
    canonicalUrl?: string;
}> = ({ children, title, metaDescription, canonicalUrl }) => {
    return (
        <div className="container mx-auto min-h-screen py-10">
            <title>{title ?? "DLTx"}</title>
            <meta
                name="description"
                content={metaDescription ?? "DLTx"}
            />
            {canonicalUrl && (
                <link rel="canonical" href={`https://dltx.io${canonicalUrl}`} />
            )}
            <div className="row-[span_9_/_span_9] overflow-auto">
                {children}
            </div>
        </div>
    );
};

export default PageLayout;
