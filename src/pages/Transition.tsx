import React from "react";
import { ClipLoader } from "react-spinners";

const Transition: React.FC = () => (
  <div className="flex justify-center items-center w-full h-full bg-black">
    <ClipLoader color="white" />
  </div>
);

export default Transition;
