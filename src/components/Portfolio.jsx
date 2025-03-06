import React, { useContext } from "react";
import "./Portfolio.css";
import Table from "./Table";
import PiePlate from "./PiePlate";

const Portfolio = () => {
  return (
    <>
      <div className="basePortfolio">
        <PiePlate />

        <div className="test">
          <Table />
        </div>
      </div>
    </>
  );
};

export default Portfolio;
