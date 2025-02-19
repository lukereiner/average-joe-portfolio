import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Welcome from "./components/Welcome";
import Age from "./components/Age";
import Funding from "./components/Funding";
import { AppProvider } from "../AppContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="age" element={<Age />} />
          <Route path="funding" element={<Funding />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
