import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";

export const App: React.FC = () => (
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>
);

export default App;