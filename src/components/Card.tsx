import React from "react";

type CardTextProps = {
    title: string;
    children: React.ReactNode;
}

type CardImageProps = {
    src: string;
}

const CardText: React.FC<CardTextProps> = ({ title, children }) => {
    return (<div className="flex flex-col justify-between base-gradient rounded-lg p-6">
        <div className="text-xl font-light mb-10">{title}</div>
        <div className="text-xs font-light">{children}</div>
    </div>);
}

const CardImage: React.FC<CardImageProps> = ({ src }) => {
    return (<div className="flex rounded-lg overflow-hidden">
        <img className="w-full object-cover" src={src}></img>
    </div>);
}

export const Card: React.FC<CardTextProps | CardImageProps> = (props) => {
    const isImage = (p: CardTextProps | CardImageProps): p is CardImageProps => (props as CardImageProps).src != undefined;
    return isImage(props) ? <CardImage {...props} /> : <CardText {...props} />;
}

export default Card;