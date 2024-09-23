import React from "react";
import PageLayout from "../components/PageLayout";
import WarningImg from "../assets/warning.svg";

const Home: React.FC = () => {
    return (
        <PageLayout>
            <div className="flex justify-center items-center h-full text-lg"><img className="mr-2" width={32} src={WarningImg} />Page not found</div>
        </PageLayout>
    );
};

export default Home;
