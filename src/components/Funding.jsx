import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Funding.css";

const Funding = () => {
  const [investment, setInvestment] = useState(() =>
    localStorage.getItem("investment")
  );
  const [deposit, setDeposit] = useState(() => localStorage.getItem("deposit"));
  const [account, setAccount] = useState(() => localStorage.getItem("account"));
  const [firm, setFirm] = useState(() => localStorage.getItem("firm"));

  useEffect(() => {
    localStorage.setItem("investment", investment);
    localStorage.setItem("deposit", deposit);
    localStorage.setItem("account", account);
    localStorage.setItem("firm", firm);
  }, [investment, deposit, firm, account]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "investment") {
      setInvestment(value);
    } else if (name === "deposit") {
      setDeposit(value);
    } else if (name === "account") {
      setAccount(value);
    } else if (name === "firm") {
      setFirm(value);
    }
  };

  console.log(investment, deposit, firm, account);

  return (
    <>
      <div className="baseFunding">
        <div className="slideBarFunding">
          <div className="ageFunding">
            <Link className="link" to="../age">
              Age
            </Link>
          </div>
          <div className="slideHighlightFunding">
            <div className="fundingFunding">Funding</div>
          </div>
          <div className="riskFunding">Risk</div>
        </div>
        <div className="greenBoxFunding">
          <div className="fundingRow">
            <div className="fundingHeader">
              <div>Initial Deposit</div>
              <input
                className="dollarInput"
                type="text"
                name="investment"
                required
                value={investment}
                onChange={handleInputChange}
              />
            </div>
            <div className="fundingHeader">
              <div>Monthly Deposit</div>
              <input
                className="dollarInput"
                type="text"
                name="deposit"
                required
                value={deposit}
                onChange={handleInputChange}
              />
            </div>
            <div className="fundingHeader">
              <div>Firm</div>
              <select
                className="dollarInput"
                name="firm"
                id="firm"
                value={firm}
                onChange={handleInputChange}
              >
                <option>Schwab</option>
                <option>Fidelity</option>
                <option>Vanguard</option>
              </select>
            </div>
            <div className="fundingHeader">
              <div>Account</div>
              <select
                className="dollarInput"
                name="account"
                id="account"
                value={account}
                onChange={handleInputChange}
              >
                <option>401k</option>
                <option>IRA</option>
                <option>Brokerage</option>
              </select>
            </div>
          </div>

          <div className="textOutput">
            <p>Test funding</p>
          </div>
          <Link className="link" to="/funding">
            <div className="button">Next</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Funding;
