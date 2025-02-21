import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Risk.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Risk = () => {
  const [value, setValue] = useState(3); // State to track the current slider value
  const marks = [
    {
      value: 1,
      label: "Conservative",
    },
    {
      value: 5,
      label: "Aggressive",
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue); // Update the state when slider value changes
  };

  const handleSliderOutput = () => {
    const riskDef = {
      1: `I want to earn some income from my investments now, without taking on too much risk. I'm primarily focused on keeping my money safe.`,
      2: `I want a steady income from my investments and some potential for growth over time. I'm willing to take on a bit more risk than someone who's very conservative, but not so much that it worries me.`,
      3: `I'm looking for steady growth in the value of my investments and am comfortable with some ups and downs along the way. While I don't want too much volatility, I understand that there may be some fluctuations in the market.`,
      4: `I'm interested in growing my wealth as quickly as possible, but I still want to be cautious. I can handle a bit more risk than someone who's moderate, but not so much that it feels reckless.`,
      5: `I'm focused on rapid growth and am willing to take on significant risk to achieve it. I understand that this means there's a chance I could lose money, but I believe the potential rewards outweigh the risks.`,
    };

    return riskDef[value];
  };

  const handleSliderProflile = () => {
    const investorProfiles = {
      1: "Conservative",
      2: "Moderately Conservative",
      3: "Moderate",
      4: "Moderately Aggressive",
      5: "Aggressive",
    };

    return investorProfiles[value];
  };

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

      <div className="greenBoxRisk">
        <div className="sliderOutput">
          <h1>Investor Risk Profile: {handleSliderProflile()}</h1>
          {handleSliderOutput()}
        </div>
        <div className="sliderbar">
          <Box sx={{ width: 190 }}>
            <Slider
              className="slider"
              aria-label="Risk Profile"
              value={value}
              onChange={handleSliderChange}
              valueLabelDisplay="off"
              step={1}
              marks={marks.map((mark) => ({
                ...mark,
                label: (
                  <span
                    style={{
                      color: "white",
                      fontWeight: mark.value === value ? "bold" : "normal",
                    }}
                  >
                    {mark.label}
                  </span>
                ),
              }))}
              min={1}
              max={5}
              sx={{
                color: "white", // Slider color
              }}
            />
          </Box>
        </div>
        <div className="buttonWrapper">
          <Link className="link" to="../portfolio">
            <div className="button">Generate Portfolio</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Risk;
