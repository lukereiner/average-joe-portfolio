import React, { useEffect, useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import "./Age.css";
import { AppContext } from "../../AppContext";

const ageContext = createContext();

const Age = () => {
  const { ageData, setAgeData } = useContext(AppContext); // Access the context

  useEffect(() => {
    localStorage.setItem("currentAge", ageData.currentAge);
    localStorage.setItem("retireAge", ageData.retireAge);
  }, [ageData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAgeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const displayOutput = () => {
    const retireYears = ageData.retireAge - ageData.currentAge;
    const retireDate = new Date().getFullYear() + retireYears;

    if (retireYears <= 0) {
      return;
    } else {
      return `You'll retire in ${retireYears} years in the year ${retireDate}.`;
    }
  };

  return (
    <div className="baseAge">
      <div className="slideBarAge">
        <div className="slideHighlightAge">
          <div className="age">Age</div>
        </div>
        <div className="fundingAge">
          <Link className="link" to='../funding'>Funding</Link>
        </div>
        <div className="riskAge">
          <Link className="link" to='../risk'>Risk</Link>
        </div>
      </div>
      <div className="greenBoxAge">
        <div className="ageRow">
          <div className="currentAge">
            <div>Current Age</div>
            <input
              className="ageInput"
              type="number"
              name="currentAge"
              min={1}
              max={80}
              required
              value={ageData.currentAge}
              onChange={handleInputChange}
            />
          </div>
          <div className="retireAge">
            <div>Retire Age</div>
            <input
              className="ageInput"
              type="number"
              name="retireAge"
              min={20}
              max={99}
              required
              value={ageData.retireAge}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="textOutput">
          <p>{displayOutput()}</p>
        </div>
        <Link className="link" to="/funding">
          <div className="button">Next</div>
        </Link>
      </div>
    </div>
  );
};

export default Age;
