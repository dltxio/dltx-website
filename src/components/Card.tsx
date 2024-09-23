import React from "react";

export const CardText: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col justify-between base-gradient rounded-lg p-6">
        <div className="text-xl font-light mb-10">{title}</div>
        <div className="text-xs font-light">{children}</div>
    </div>);
}

export const CardImage: React.FC<{ src: string }> = ({ src }) => {
    return (<div className="flex rounded-lg overflow-hidden">
        <img className="w-full object-cover" src={src}></img>
    </div>);
}
