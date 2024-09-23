import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type PageLayoutProps = {
    children: React.ReactNode;
    title?: string;
    metaDescription?: string;
    canonicalUrl?: string;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children, title, metaDescription, canonicalUrl }) => {
    return (
        <div className="container flex mx-auto min-h-screen py-10">
            {title && <title>{title}</title>}
            {metaDescription && <meta name="description" content={metaDescription} />}
            {canonicalUrl && <link rel="canonical" href={`https://dltx.io${canonicalUrl}`} />}
            <div className="overflow-hidden">
                <div className="flex flex-col h-full divide-y divide-dltx-grey px-2 py-1">
                    <Header />
                    {children}
                    <div className="flex-auto !border-t-0"></div>  {/* For short page, pad to ensure footer is at bottom */}
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default PageLayout;
