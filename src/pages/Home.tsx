import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive"
import classnames from "classnames";
import PageLayout from "../components/PageLayout";
import WomanImg from "../assets/woman.png";
import RoomImg from "../assets/room.png";
import MeetingImg from "../assets/meeting.png";
import DoorImg from "../assets/door.png";
import DoorOpenImg from "../assets/door-open.png";
import LogoSvg from "../assets/logo.svg";

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);
const breakpoints = {
    isXs: "480px",
    isSm: "640px",
    isMd: "768px",
    isLg: "1024px",
    isXl: "1280px",
};
type BreakpointKey = keyof typeof breakpoints;
export function useBreakpoint() {
    var keys = Object.keys(breakpoints) as unknown as BreakpointKey[];
    return keys.reduce((acc, key) => {
        const width = fullConfig?.theme?.screens?.[key.replace("is", "").toLowerCase()] || breakpoints[key];
        return { ...acc, [key]: useMediaQuery({ query: `(min-width: ${width})` }) }
    }, {}) as Record<BreakpointKey, boolean>;
}

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const { isLg } = useBreakpoint();

    return (<div className="flex flex-col items-center py-16">
        <div className="text-sm pb-10">{title}</div>
        <div className={classnames("text-lg text-center", { "w-1/2": isLg }, { "w-4/5": !isLg })}>{children}</div>
    </div >);
}

const CardText: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col justify-between bg-gradient-to-r from-transparent to-[#202020] rounded-lg p-6">
        <div className="text-xl mb-10">{title}</div>
        <div className="text-xs">{children}</div>
    </div>);
}

const CardImage: React.FC<{ src: string }> = ({ src }) => {
    return (<div className="flex rounded-lg overflow-hidden">
        <img src={src}></img>
    </div>);
}

const HeaderTest: React.FC = () => {
    const MenuItem: React.FC<{ title: string, index: number, active?: boolean }> = ({ title, index, active }) => {
        return (<>
            <div className={`row-start-1 col-start-${index} flex items-center px-2`}>
                <Link className={classnames({ "text-white": !!active }, { "text-[#77878]": !active })} to={"/" + title.toLowerCase()}>{title}</Link>
            </div>
            <div className={classnames(`row-start-2 col-start-${index}`, { "border-b-2 border-[#E6FF02]": !!active })}></div>
        </>);
    }

    return (<div className="grid-menu text-2xs">
        <div className="row-start-1 col-start-1 flex items-center">
            <img src={LogoSvg}></img>
            <div className="pl-2">Engineered to meet the needs of the corporate sector</div>
        </div>
        <div className="row-start-2 col-start-1"></div>
        <div className="row-start-1 col-start-2"></div>
        <div className="row-start-2 col-start-2"></div>
        <MenuItem title="Capability" index={3} />
        <MenuItem title="Manifesto" index={4} active={true} />
        <MenuItem title="Insights" index={5} />
        <button className="row-start-1 col-start-6 bg-[#E6FF02] text-black py-1 ml-2">Contact</button>
        <div className="row-start-2 col-start-6"></div>
    </div>);
}

const Footer: React.FC = () => {
    const { isLg, isXl } = useBreakpoint();

    return (<div className="pt-4 items-center">
        <div className="relative">
            <div className="lg:hidden">
                <img src={DoorImg}></img>
                <div className="absolute w-full h-full top-0 left-0">
                    <div className="flex h-full justify-center items-center">
                        <button className="bg-[#E6FF02] text-black text-xs mx-auto">Book a consultation</button>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <img src={DoorOpenImg}></img>
                <div className="absolute w-full top-[53%] left-0">
                    <div className="flex">
                        <button className="bg-[#E6FF02] text-black text-xs mx-auto">Book a consultation</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={classnames("flex items-start justify-between pt-4 gap-y-4 text-2xs", { "flex-col ": !isLg })}>
            <img src={LogoSvg}></img>
            <div className={classnames("flex flex-wrap", { "flex-col": !isXl })}>
                <div>BLOCKCHAIN&nbsp;TECHNOLOGY/</div>
                <div>DEFI/</div>
                <div>ERC721&nbsp;NFT&nbsp;CONTRACTS/</div>
                <div>ERC20&nbsp;SMART&nbsp;CONTRACTS</div>
            </div>
            <div className="text-[#787878]">2024 &#169; DLTx Labs</div>
        </div>
    </div>);
}

const Home: React.FC = () => {
    return (
        <PageLayout>
            <div className="divide-y divide-[#818181]">
                <HeaderTest />

                <Section title="OUR CAPABILITY">
                    We build platforms and dApps on the Ethereum blockchain, providing consultancy and workshops to unlock the power of this new technology for companies big and small across Australia.
                </Section>

                <div className="grid-card gap-6 py-4">
                    <CardImage src={WomanImg}></CardImage>
                    <CardText title="ERC 20 Contracts">ERC20 contracts lie at the heart of all de-fi exchanges and ICOs. We have delivered dozens of these for our clients, from startups to decades old 'industry-leading' businesses. They can also be great building blocks for your dApp.</CardText>
                    <CardImage src={MeetingImg}></CardImage>
                    <CardText title="ERC 721 NFT Contracts">Collectables are a great use case for this technology. Not only can they be used for Crypto Kitties and other virtual assets, but also real world assets such as livestock, luxury items and collectables.</CardText>
                    <CardImage src={RoomImg}></CardImage>
                    <CardText title="De-Fi Contracts">Crowd funding and crypto currency creation can be implanted with relative ease using the power of smart contracts and the ERC20 standard. DLTx has significant experience in tokenisation, de-fi and ICO crowd sales.</CardText>
                </div>

                <Section title="MORE THAN TOKENS">
                    We believe its time to start building. Private chains, RESTful APIs in Solidity, NodeJS, C#, Python and more are all within our capabilities.
                </Section>

                <Footer />
            </div>
        </PageLayout>
    );
};

export default Home;
