import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Welcome from "./components/Welcome";
import Guide from "./components/Guide";
import Age from "./components/Age";
import Funding from "./components/Funding";
import Risk from "./components/Risk";
import Portfolio from "./components/Portfolio";
import { AppProvider } from "../AppContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="guide" element={<Guide />} />
          <Route path="age" element={<Age />} />
          <Route path="funding" element={<Funding />} />
          <Route path="risk" element={<Risk />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
