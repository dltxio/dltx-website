import React, { useRef, useState } from "react";
import classnames from "classnames";
import PageLayout from "../components/PageLayout";
import Section from "../components/Section";
import Input from "../components/Input";

type ContactFields = {
    givenName?: string;
    surname?: string;
    email?: string;
    phone?: string;
    message?: string;
}

const Contact: React.FC = () => {
    const [messageResponse, setMessageResponse] = useState<[boolean, string]>();
    const fields = useRef<ContactFields>({});

    const fieldChanged = (k: keyof ContactFields) => (v: string) => fields.current = { ...fields.current, [k]: v };

    const sendMessage = (fields: ContactFields) => {
        try {
            // TODO: create google form and submit
            setMessageResponse([true, "Message sent"]);
        } catch (err) {
            console.error(err);
            setMessageResponse([false, "Failed to send message"])
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
                    <div className={classnames("rounded-sm mt-1 py-3 text-center", { "text-dltx-green": messageResponse[0] }, { "text-[#A94442]": !messageResponse[0] })}>{messageResponse}</div> :
                    <button className="base-button mt-1 py-3" onClick={() => sendMessage(fields.current)}>Send message</button>}
                <div className="text-2xs text-center pt-3">We value your privacy and will never abuse your personal details</div>
            </div>
        </div>
    </PageLayout>);
};

export default Contact;