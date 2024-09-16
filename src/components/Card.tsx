import React from "react";

export const CardText: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col justify-between bg-gradient-to-r from-transparent to-[#202020] rounded-lg p-6">
        <div className="text-xl mb-10">{title}</div>
        <div className="text-xs">{children}</div>
    </div>);
}

export const CardImage: React.FC<{ src: string }> = ({ src }) => {
    return (<div className="flex rounded-lg overflow-hidden">
        <img src={src}></img>
    </div>);
}
