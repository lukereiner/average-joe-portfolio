import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Age.css";

const ageContext = createContext();

const Age = () => {
  const [currentAge, setCurrentAge] = useState(
    () => parseInt(localStorage.getItem("currentAge")) || ""
  );
  const [retireAge, setRetireAge] = useState(
    () => parseInt(localStorage.getItem("retireAge")) || ""
  );

  useEffect(() => {
    localStorage.setItem("currentAge", currentAge);
    localStorage.setItem("retireAge", retireAge);
  }, [currentAge, retireAge]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "currentAge") {
      setCurrentAge(value);
    } else if (name === "retireAge") {
      setRetireAge(value);
    }
  };

  const displayOutput = () => {
    const retireYears = retireAge - currentAge;
    const retireDate = new Date().getFullYear() + retireYears;

    if (retireYears <= 0) {
      return;
    } else {
      return [
        `You'll retire in ${retireYears} years in the year ${retireDate}.`,
      ];
    }
  };  

  return (
    <>
      <div className="baseAge">
        <div className="slideBarAge">
          <div className="slideHighlightAge">
            <div className="age">Age</div>
          </div>
          <div className="fundingAge">Funding</div>
          <div className="riskAge">Risk</div>
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
                value={currentAge}
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
                value={retireAge}
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
    </>
  );
};

export default Age;
