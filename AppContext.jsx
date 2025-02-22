import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [ageData, setAgeData] = useState({
    currentAge: parseInt(localStorage.getItem("currentAge")) || "",
    retireAge: parseInt(localStorage.getItem("retireAge")) || "",
  });

  const [fundingData, setFundingData] = useState({
    investment: localStorage.getItem("investment") || "",
    deposit: localStorage.getItem("deposit") || "",
    account: localStorage.getItem("account") || "",
    firm: localStorage.getItem("firm") || "",
  });

  const [riskData, setRiskData] = useState({
    risk: parseInt(localStorage.getItem("risk")) || "",
  });

  return (
    <AppContext.Provider value={{ ageData, setAgeData, fundingData, setFundingData, riskData, setRiskData }}>
      {children}
    </AppContext.Provider>
  );
};