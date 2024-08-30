import React from "react";
import { ClipLoader } from "react-spinners";
import PageLayout from "../components/PageLayout";

const Transition: React.FC = () => (
  <PageLayout>
    <div className="absolute inset-0 flex flex-col items-center justify-center w-screen h-screen">
      <ClipLoader color="white" />
    </div>
  </PageLayout>
);

export default Transition;
