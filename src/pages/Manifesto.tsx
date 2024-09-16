import React from "react";
import PageLayout from "../components/PageLayout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import Slideshow from "../components/Slideshow";
import { CardImage, CardText } from "../components/Card";
import OfficeImg from "../assets/office.png";
import RoomImg from "../assets/room.png";
import DesksImg from "../assets/desks.png";

const Slide: React.FC<{ title: string, subheading: string, children: React.ReactNode }> = ({ title, subheading, children }) => {
    return (<div className="flex flex-col m-10">
        <div className="mb-4">
            <div className="text-2xs font-semibold mb-4">{title}</div>
            <div className="text-sm font-semibold">{subheading}</div>
        </div>
        <div className="text-2xs">{children}</div>
    </div>);
}

const Slide1: React.FC = () => {
    return <Slide title="Pragmatic and Practical" subheading="Efficient, Precise and Accurate. Straight to the point.">
        Pragmatism and practicality form the bedrock of our brand. The possibilities blockchain presents in our everyday is infinite.
        We understand that in this dynamic and ever-evolving world, a practical approach is essential in driving meaningful progress.
        By prioritising real-world results and tangible outcomes over theoretical concepts, we ensure every project is practical, applicable and delivers real world value.
    </Slide>;
}

const Slide2: React.FC = () => {
    return <Slide title="Collaborative and Connected" subheading="True partnership, full involvement, collective intelligence.">
        We unlock new possibilities, leverage collective intelligence, and cultivate a connected community to actively fuel innovation.
        By embracing partnerships and fostering collaboration, we’re able to more actively engage with a diverse network of stakeholders,
        degens, founders, and corporates to create an environment where ideas flow freely, expertise is shared, and collective progress is made toward the future.
    </Slide>;
}

const Slide3: React.FC = () => {
    return <Slide title="Honest And Conscious" subheading="Stand by what we make, invest in what we believe, fair and calibrated.">
        Transparency, integrity, and calibrated conduct are incredibly important to our studio. We’re fully transparent about our processes, technologies, and intentions from the very outset of every project.
        Our commitment to ethical practices ensures that we contribute to the development of a sustainable and responsible ecosystem. Leading an industry means actively shaping its future and that’s what we’re here to do.
    </Slide>;
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

                <Slideshow slides={[<Slide1 />, <Slide2 />, <Slide3 />]} />

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

