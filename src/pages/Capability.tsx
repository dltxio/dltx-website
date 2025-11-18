import React from "react";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Card from "../components/Card";
import WomanImg from "../assets/DLTXLABS_ERC721.jpg";
import RoomImg from "../assets/DLTXLABS_office_sign.jpg";
import MeetingImg from "../assets/DLTXLABS_blockchainweek_panel.jpg";

const Capability: React.FC = () => {
    return (
        <PageLayout title="Capability" metaDescription="Outlines the capability of DLTx in blockchain consultancy" canonicalUrl="/capability">
            <Section title="OUR CAPABILITY">
                We build platforms and dApps on the Ethereum blockchain, providing consultancy and workshops to unlock the power of this new technology for companies big and small across Australia.
            </Section>

            <div className="grid-card gap-6 py-4">
                <Card src={WomanImg}></Card>
                <Card title="Smart Contracts">ERC20 and other smart contracts lie at the heart of leveraging Distributed Ledger Technology to provide outstanding business solutions. We've delivered Automated Market Makers (AMMs), Real World Asset (RWA) tokenisation and NFTs for clients in multiple use cases over the last 6 years. ESG and Fintech are a current focus.</Card>
                <Card src={MeetingImg}></Card>
                <Card title="Non-Fungible Tokens (NFTs)">Collectables are a great use case for this technology…but before that came along DLTx was tokenising assets for clients on EVMs. Since then, we've added significant functionality that allows an NFT to meet both ERC 721 and ERC 1155 at the same time (demo coming soon to infringo.com.au).</Card>
                <Card src={RoomImg}></Card>
                <Card title="Integrated Teams">DLTx Labs works directly with your team to provide specialist Web 3 solution design and product advisory…and then follows up to deliver the knowledge and expertise that guide the developers that will be working on your products for their full lifecycle.</Card>
            </div>

            <Section title="More Than Tokens">
                The best time to start building is today. Public/Private chains, RESTful APIs in Solidity, NodeJS, C#, MERN and much more are all within our capabilities.
            </Section>
        </PageLayout>
    );
};

export default Capability;
