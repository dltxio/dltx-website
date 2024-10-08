import React from "react";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Card from "../components/Card";
import WomanImg from "../assets/woman.jpg";
import RoomImg from "../assets/room.jpg";
import MeetingImg from "../assets/meeting.jpg";

const Capability: React.FC = () => {
    return (
        <PageLayout title="Capability" metaDescription="Outlines the capability of DLTx in blockchain consultancy" canonicalUrl="/capability">
            <Section title="OUR CAPABILITY">
                We build platforms and dApps on the Ethereum blockchain, providing consultancy and workshops to unlock the power of this new technology for companies big and small across Australia.
            </Section>

            <div className="grid-card gap-6 py-4">
                <Card src={WomanImg}></Card>
                <Card title="ERC 20 Contracts">ERC20 contracts lie at the heart of all de-fi exchanges and ICOs. We have delivered dozens of these for our clients, from startups to decades old 'industry-leading' businesses. They can also be great building blocks for your dApp.</Card>
                <Card src={MeetingImg}></Card>
                <Card title="ERC 721 NFT Contracts">Collectables are a great use case for this technology. Not only can they be used for Crypto Kitties and other virtual assets, but also real world assets such as livestock, luxury items and collectables.</Card>
                <Card src={RoomImg}></Card>
                <Card title="De-Fi Contracts">Crowd funding and crypto currency creation can be implanted with relative ease using the power of smart contracts and the ERC20 standard. DLTx has significant experience in tokenisation, de-fi and ICO crowd sales.</Card>
            </div>

            <Section title="MORE THAN TOKENS">
                We believe its time to start building. Private chains, RESTful APIs in Solidity, NodeJS, C#, Python and more are all within our capabilities.
            </Section>
        </PageLayout>
    );
};

export default Capability;
