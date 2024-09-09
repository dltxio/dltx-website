import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slideshow from "../components/Slideshow";
import PyramidImg from "../assets/pyramid.svg";
import WaveformImg from "../assets/waveform.svg";
import SpikesImg from "../assets/spikes.svg";

const ContractCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    return (<div className="flex flex-col px-16 py-4">
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

const BlogCard: React.FC<{ category: string, subheading: string, children: React.ReactNode }> = ({ category, subheading, children }) => {
    return (<div className="flex flex-col bg-gradient-to-r from-transparent to-[#202020] rounded-xl p-6">
        <div className="mb-4">
            <div className="text-2xs font-semibold w-fit mb-4 border border-white border-solid rounded-xl px-2 py-1">{category}</div>
            <div className="text-sm font-semibold">{subheading}</div>
        </div>
        <div className="text-2xs">{children}</div>
    </div>);
}

const FutureCard: React.FC = () => {
    return <BlogCard category="Future Thinking" subheading="Exploring the Future of Blockchain: Unleashing Revolutionary Potential">
        Dive into the captivating world of blockchain technology and discover its immense potential for revolutionizing industries across the globe.
        In this insightful blog post, we unravel...
    </BlogCard>;
}

const BasicsCard: React.FC = () => {
    return <BlogCard category="Blockchain Basics" subheading="Demystifying Smart Contracts: Unlocking Efficiency and Security">
        Smart contracts have emerged as one of the most revolutionary applications of blockchain technology.
        In this informative blog post, we demystify the concept of smart contracts and delve into their potential to streamline processes, eliminate intermediaries
    </BlogCard>;
}

const TransformationCard: React.FC = () => {
    return <BlogCard category="Transformation" subheading="Blockchain and Data Privacy: Building Trust in the Digital Age">
        In an era dominated by data-driven technologies, privacy and trust have become paramount concerns.
        Enter blockchain, the technology that holds the promise of reshaping the landscape of data privacy.
        In this thought-provoking
    </BlogCard>;
}

const contractCards = [<ERC20Card />, <ERC721Card />, <DeFiCard />];
const contractImages = [PyramidImg, WaveformImg, SpikesImg];

const Home: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    const ContractImage: React.FC<{ src: string }> = useCallback(({ src }) => <motion.img className="mx-16"
        src={src}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeIn", duration: 1 }} />, []);

    return (
        <PageLayout>
            <div className="divide-y divide-[#818181]">
                <Header />

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
                        <Slideshow slides={contractCards} isColumnLayout={true} onChange={(index: number, isDesktop: boolean) => setActiveIndex(isDesktop ? index : -1)} />
                    </div>
                    {(activeIndex >= 0) && <div className="flex flex-[0_0_50%] justify-center items-center">
                        {contractImages.map((src, index) => (index == activeIndex) && <ContractImage key={index} src={src}></ContractImage>)}
                    </div>}

                </div>

                <div className="grid-card-sm gap-6 py-4">
                    <FutureCard />
                    <BasicsCard />
                    <TransformationCard />
                </div>

                <Footer />
            </div>
        </PageLayout>
    );
};

export default Home;