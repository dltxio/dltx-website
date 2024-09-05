import React from "react";
import { motion } from "framer-motion";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WomanImg from "../assets/woman.png";
import RoomImg from "../assets/room.png";
import MeetingImg from "../assets/meeting.png";

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

const Home: React.FC = () => {
    return (
        <PageLayout>
            <div className="divide-y divide-[#818181]">
                <Header />

                <div className="flex flex-col items-center">
                    <div className="flex flex-auto items-end text-4xl text-center pt-16 pb-4">Reinvent the future</div>
                    <div className="h-[130px] sm:h-[240px] px-[30px] pt-[30px] overflow-hidden">
                        <motion.div className="sun h-[240px] w-[240px] sm:h-[500px] sm:w-[500px]"
                            initial={{ y: "60%" }}
                            animate={{ y: "10%" }}
                            transition={{ ease: "easeIn", duration: 3 }}></motion.div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between pt-16 pb-4">
                    <div className="flex flex-col md:w-1/2">
                        <div className="text-sm font-semibold">Web 3 is complex. We untangle it.</div>
                        <div className="text-sm">DLTx is a leading blockchain dev studio unlocking opportunity for Australia's most forward-focused and driven companies.</div>
                    </div>
                    <div className="flex items-end text-sm font-semibold pt-4">The revolution is here</div>
                </div>

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
