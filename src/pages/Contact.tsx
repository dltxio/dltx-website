import React, { useRef, useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Input from "../components/Input";
import { CONTACT_URL } from "../constants/env";

type ContactFields = {
    givenName?: string;
    surname?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [messageResponse, setMessageResponse] = useState<[string, string]>();
    const fields = useRef<ContactFields>({});

    const fieldChanged = (k: keyof ContactFields) => (v: string) => fields.current = { ...fields.current, [k]: v };

    const sendMessage = async () => {
        try {
            setMessageResponse(["text-white", "Processing..."]);
            await axios.post(CONTACT_URL, fields.current, { headers: { 'Content-Type': 'application/json' } });
            setMessageResponse(["text-dltx-green", "Message sent"]);
        } catch (err) {
            console.error(err);
            setMessageResponse(["text-[#A94442]", "Failed to send message"])
        }
    };

    return (<PageLayout title="Contact" metaDescription="Contact DLTx to discuss a potential partnership" canonicalUrl="/contact">
        <Section title="CONTACT">
            We build platforms and dApps on the Ethereum blockchain, providing consultancy and workshops to unlock the power of this new technology for companies big and small across Australia.
        </Section>

        <div className="flex justify-center pb-16 !border-t-0">
            <div className="flex flex-col w-4/5 md:w-1/2 xl:w-1/3 text-xs">
                <Input placeholder="Given name" onChange={fieldChanged("givenName")}></Input>
                <Input placeholder="Surname" onChange={fieldChanged("surname")}></Input>
                <Input placeholder="Email" onChange={fieldChanged("email")}></Input>
                <Input placeholder="Phone" onChange={fieldChanged("phone")}></Input>
                <Input placeholder="Your message" multiline={true} className="flex-auto" onChange={fieldChanged("message")}></Input>
                {messageResponse ?
                    <div className={`rounded-sm mt-1 py-3 text-center ${messageResponse[0]}`}>{messageResponse[1]}</div> :
                    <button className="base-button mt-1 py-3" onClick={sendMessage}>Send message</button>}
                <div className="text-2xs text-center pt-3">We value your privacy and will never abuse your personal details</div>
            </div>
        </div>
    </PageLayout >);
};

export default Contact;