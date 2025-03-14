import React, { useContext } from "react";
import "./Portfolio.css";
import Table from "./Table";
import PiePlate from "./PiePlate";
import Returns from "./Returns";
import { Link } from "react-router-dom";

const Portfolio = () => {

  return (
    <>
      <div className="topPortfolio">
        <div className="topHalf">
          <PiePlate id="piePlate" />

          <Table id="table" />

        </div>

        <div className="bottomHalf">
          <Returns id="chart" />

          <Link className="link" to="/age">
            <div className="button">Edit Info</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
