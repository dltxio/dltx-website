import React from "react";

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col items-center py-16">
        <div className="text-sm pb-10">{title}</div>
        <div className="text-lg text-center font-light w-4/5 lg:w-1/2">{children}</div>
    </div >);
}

export default Section;