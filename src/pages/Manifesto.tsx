import React from "react";
import classnames from "classnames";
import useBreakpoint from "../hooks/useBreakpoint";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import OfficeImg from "../assets/office.png";
import RoomImg from "../assets/room.png";
import DesksImg from "../assets/desks.png";

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

const Manifesto: React.FC = () => {
    return (
        <PageLayout>
            <div className="divide-y divide-[#818181]">
                <Header />

                <Section title="OUR MANIFESTO">
                    We now live in a world where technology advances at a rapid pace. A world in a constant state of flux. A civilisation that refuses to believe in a centralised and falsely governed state. We believe our destiny is in no way shaped by the propaganda of today.
                </Section>

                <img className="py-4" src={OfficeImg}></img>

                <div className="flex flex-col items-center py-10">
                    <div className="text-sm pb-10">METHODOLOGY</div>
                    <div className="grid-card gap-6">
                        <CardImage src={RoomImg}></CardImage>
                        <CardText title="Blockchain Software Delivered with Precision">Prioritise your project’s success with a development approach that mirrors Agile’s focus on early and continuous delivery. Our method ensures your digital experience is delivered with precision, and valuable results at every stage.</CardText>
                        <CardText title="Adaptable Design for a Changing World">Embrace flexibility in your process. Just as Agile welcomes changing requirements, our approach is built to evolve with adaptable blockchain solutions that keep your project ahead of the curve.</CardText>
                        <CardText title="Modular, Efficient, Effective">Achieve more with less. Our approach emphasises simplicity and efficiency, allowing for modular components that work seamlessly together, ensuring your project stays on time and on target.</CardText>
                        <CardText title="Collaboratively Crafted, Perfectly Organised">Focused on collaboration. Our approach is structured to support teamwork and creativity, with self-organising layouts that promote innovation and reflect Agile’s core values.</CardText>
                        <CardImage src={DesksImg}></CardImage>
                    </div>

                </div>

                <Footer />
            </div>
        </PageLayout>
    );
};

export default Manifesto;
