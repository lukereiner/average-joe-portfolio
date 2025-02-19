import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Risk.css";
import { AppContext } from "../../AppContext";

const Risk = () => {
  return (
    <div className="baseRisk">
      <div className="slideBarRisk">
        <div className="ageRisk">
          <Link className="link" to="../age">
            Age
          </Link>
        </div>
        <div className="fundingRisk">
          <Link className="link" to="../funding">
            Funding
          </Link>
        </div>
        <div className="slideHighlightRisk">
          <div className="riskRisk">Risk</div>
        </div>
      </div>

      <Link className="link" to="/">
        <div className="button">Next</div>
      </Link>
    </div>
  );
};

export default Risk;
