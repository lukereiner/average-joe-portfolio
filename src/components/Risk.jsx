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
      value: 3,
      label: "Moderate",
    },
    {
      value: 5,
      label: "Aggressive",
    },
  ];

  const handleSliderChange = (event, newValue) => {
    setValue(newValue); // Update the state when slider value changes
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

      <Box sx={{ width: 250 }}>
        <Slider
          className="slider"
          aria-label="Risk Profile"
          value={value}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
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

      <Link className="link" to="/">
        <div className="button">Next</div>
      </Link>
    </div>
  );
};

export default Risk;
