import React from "react";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import { CardImage, CardText } from "../components/Card";
import WomanImg from "../assets/woman.png";
import RoomImg from "../assets/room.png";
import MeetingImg from "../assets/meeting.png";

const Capability: React.FC = () => {
    return (
        <PageLayout>
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
        </PageLayout>
    );
};

export default Capability;
