import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import { useInsights } from "../hooks/useInsights";
import PageLayout from "../components/PageLayout";
import InsightCard from "../components/InsightCard";
import Slideshow, { SlideshowLayout } from "../components/Slideshow";
import PyramidImg from "../assets/pyramid.svg";
import WaveformImg from "../assets/waveform.svg";
import SpikesImg from "../assets/spikes.svg";

//=============================== Contract Cards ==============================

const ContractCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col px-4 lg:px-10 py-4">
        <div className="text-sm font-semibold mb-4">{title}</div>
        <div className="text-2xs">{children}</div>
    </div>);
}

const ERC20Card: React.FC = () => {
    return <ContractCard title="ERC20 Contracts">
        ERC20 contracts lie at the heart of all de-fi exchanges and ICOs.
        We have delivered dozens of these for our clients, from startups to decades old 'industry-leading' businesses.
        They can also be great building blocks for your dApp.
    </ContractCard>;
}

const ERC721Card: React.FC = () => {
    return <ContractCard title="ERC721 NFT Contracts">
        Collectables are a great use case for this technology.
        Not only can they be used for Crypto Kitties and other virtual assets, but also real world assets such as livestock, luxury items and collectables.
    </ContractCard>;
}

const DeFiCard: React.FC = () => {
    return <ContractCard title="De-Fi Contracts">
        Crowd funding and crypto currency creation can be implanted with relative ease using the power of smart contracts and the ERC20 standard.
        DLTx has significant experience in tokenisation, de-fi and ICO crowd sales.
    </ContractCard>;
}

//============================= Testimonial Cards =============================

const TestimonalCard: React.FC<{ name: string, role: string, children: React.ReactNode }> = ({ name, role, children }) => {
    const { isLg } = useBreakpoint();

    return (<div className="flex flex-col items-center">
        <div className={classnames("text-lg text-center", { "w-1/2": isLg }, { "w-4/5": !isLg })}>{children}</div>
        <div className="text-2xs pt-10">{name}</div>
        <div className="text-2xs">{role}</div>
    </div>);
}

const TBDCard: React.FC = () => {
    return <TestimonalCard name="WILLIAM SMITH" role="CTO / TBD">
        “DLTx's expertise in blockchain and smart contracts has streamlined our processes, delivering secure, production-ready solutions that drive our business forward.”
    </TestimonalCard>;
}

const AnotherTBDCard: React.FC = () => {
    return <TestimonalCard name="JILL JACKSON" role="CEO / Another TBD">
        “I would highly recommend DLTx. Their ability to execute and deliver an outstanding product has made my job significantly easier.”
    </TestimonalCard>;
}

//================================= End Cards =================================

const contractCards = [<ERC20Card />, <ERC721Card />, <DeFiCard />];
const contractImages = [PyramidImg, WaveformImg, SpikesImg];
const testimonialCards = [<TBDCard />, <AnotherTBDCard />];

const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [insights] = useInsights();

    const ContractImage: React.FC<{ src: string }> = useCallback(({ src }) => <motion.img className="mx-16"
        src={src}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeIn", duration: 1 }} />, []);

    return (
        <PageLayout>
            <div className="flex flex-col items-center">
                <div className="flex flex-auto items-end text-4xl text-center pt-16">Reinvent the Future</div>
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

            <div className="flex py-12">
                <div className="flex flex-auto">
                    <Slideshow slides={contractCards} layout={SlideshowLayout.Column} onChange={(index: number, isDesktop: boolean) => setActiveIndex(isDesktop ? index : -1)} />
                </div>
                {(activeIndex >= 0) && <div className="flex flex-[0_0_50%] justify-center items-center">
                    {contractImages.map((src, i) => (i == activeIndex) && <ContractImage key={i} src={src}></ContractImage>)}
                </div>}

            </div>

            <div className="grid-card gap-6 py-4">
                {insights.slice(0, 3).map((insight, i) => <InsightCard key={i} {...insight} />)}
            </div>

            <div className="flex flex-col items-center py-16">
                <div className="text-sm pb-10">TESTIMONIALS</div>
                <Slideshow slides={testimonialCards} layout={SlideshowLayout.SinglePerRow} />
            </div>
        </PageLayout>
    );
};

export default Home;