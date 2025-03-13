import React, { useContext } from "react";
import "./Portfolio.css";
import Table from "./Table";
import PiePlate from "./PiePlate";
import Returns from "./Returns";

const Portfolio = () => {
  return (
    <>
      <div className="basePortfolio">
        <PiePlate />

        <div>
          <Table />
        </div>

      </div>

      <div className="basePortfolio">
        <Returns />
      </div>
    </>
  );
};

export default Portfolio;
