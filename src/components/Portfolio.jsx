import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import Table from "./Table";
import PiePlate from "./PiePlate";
import Returns from "./Returns";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <p id="loading-screen-text">Generating portfolio 💰</p>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="topPortfolio">
        <div className="topHalf">
          <PiePlate id="piePlate" />

          <Table id="table" />
        </div>

        <div className="bottomHalf">
          <Returns id="chart" />

          <div className="buttonSection">
            <Link className="link" to="/age">
              <div className="button">Edit Info</div>
            </Link>
            <Link className="link" to="/guide">
              <div className="button">Back to Guide</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
