import React from "react";
import Navigation from "./Navigation";
import { BrowserRouter } from "react-router-dom";
import { SettingsProvider } from "./providers/Settings";

export const App: React.FC = () => (
  <SettingsProvider>
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  </SettingsProvider>
);

export default App;