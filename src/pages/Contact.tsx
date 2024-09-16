import React, { useState } from "react";
import classnames from "classnames";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";

type TextProps = {
    placeholder: string;
    multiline?: boolean;
    className?: string;
}

const Input: React.FC<TextProps> = ({ placeholder, multiline = false, className = "" }) => {
    const [text, setText] = useState('');

    const changed = <T extends { value: string }>(e: React.ChangeEvent<T>) => setText(e.target.value);

    return (multiline ?
        <textarea className={classnames("base-input", className)} rows={10} placeholder={placeholder} value={text} onChange={changed} /> :
        <input className={classnames("base-input", className)} placeholder={placeholder} value={text} onChange={changed} />);
};

const Contact: React.FC = () => {
    return (
        <PageLayout>
            <div className="flex flex-col h-full divide-y divide-[#818181]">
                <Header />

                <Section title="CONTACT">
                    We build platforms and dApps on the Ethereum blockchain, providing consultancy and workshops to unlock the power of this new technology for companies big and small across Australia.
                </Section>

                <div className="flex flex-auto justify-center pb-16 !border-t-0">
                    <div className="flex flex-col w-4/5 md:w-1/2 xl:w-1/3 text-xs">
                        <Input placeholder="Given name"></Input>
                        <Input placeholder="Surname"></Input>
                        <Input placeholder="Email"></Input>
                        <Input placeholder="Phone"></Input>
                        <Input placeholder="Your message" multiline={true} className="flex-auto"></Input>
                        <button className="bg-[#E6FF02] text-black rounded-sm mt-1 py-3">Send message</button>
                        <div className="text-2xs text-center pt-3">We value your privacy and will never abuse your personal details</div>
                    </div>
                </div>

                <Footer />
            </div>
        </PageLayout>
    );
};

export default Contact;

