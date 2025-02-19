import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./Funding.css";
import { AppContext } from "../../AppContext";

const Funding = () => {
  const { fundingData, setFundingData, ageData } = useContext(AppContext); // Access the context

  useEffect(() => {
    localStorage.setItem("investment", fundingData.investment);
    localStorage.setItem("deposit", fundingData.deposit);
    localStorage.setItem("account", fundingData.account);
    localStorage.setItem("firm", fundingData.firm);
  }, [fundingData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFundingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const displayOutput = () => {
    //const yearlyDeposit = fundingData.deposit * 12;
    const userAge = ageData.currentAge;
    const userAccount = fundingData.account;

    function limitCalc(currentAge, monthlyDeposit, account) {
        const accountTypes = ["401k", "IRA", "Brokerage"];
        const fourOhOneK = [23500, 31000];
        const ira = [7000, 8000];
        const yearlyDeposit = monthlyDeposit * 12;
    
        // Under 50, 401k
        if (currentAge < 50 && account === "401k") {
            if (yearlyDeposit < fourOhOneK[0]) {
                return `With a ${account}, you can invest up to $${fourOhOneK[0].toLocaleString()
                    }/yr. Based on your monthly deposit, you can invest $${(fourOhOneK[0] - yearlyDeposit
                    ).toLocaleString()} more before reaching the account limit.`;
            } else if (yearlyDeposit === fourOhOneK[0]) {
                return `You've reached the max yearly limit with a ${account}. Anything more will need to go into an IRA or Brokerage account.`;
            } else {
                return `With a ${account}, you can invest up to $${fourOhOneK[0].toLocaleString()
                    }/yr. Based on your monthly deposit, you are $${(yearlyDeposit - fourOhOneK[0]
                    ).toLocaleString()} over the account limit. You'll need to deposit the difference into an IRA or Brokerage account.`;
            }
        // Over 50, 401k
        } else if (currentAge >= 50 && account === "401k") {
            if (yearlyDeposit < fourOhOneK[1]) {
                return `With a ${account}, you can invest up to $${fourOhOneK[1].toLocaleString()
                    }/yr. Based on your monthly deposit, you can invest $${(fourOhOneK[1] - yearlyDeposit
                    ).toLocaleString()} more before reaching the account limit.`;
            } else if (yearlyDeposit === fourOhOneK[1]) {
                return `You've reached the max yearly limit with a ${account}. Anything more will need to go into an IRA or Brokerage account.`;
            } else {
                return `With a ${account}, you can invest up to $${fourOhOneK[1].toLocaleString()
                    }/yr. Based on your monthly deposit, you are $${(yearlyDeposit - fourOhOneK[1]
                    ).toLocaleString()} over the account limit. You'll need to deposit the difference into an IRA or Brokerage account.`;
            }
        // Under 50, IRA
        } else if (currentAge < 50 && account === 'IRA') {
            if (yearlyDeposit < ira[0]) {
                return `With a ${account}, you can invest up to $${ira[0].toLocaleString()
                    }/yr. Based on your monthly deposit, you can invest $${(ira[0] - yearlyDeposit
                    ).toLocaleString()} more before reaching the account limit.`;
            } else if (yearlyDeposit === ira[0]) {
                return `You've reached the max yearly limit with a ${account}. Anything more will need to go into an 401k or Brokerage account.`;
            } else {
                return `With a ${account}, you can invest up to $${ira[0].toLocaleString()
                    }/yr. Based on your monthly deposit, you are $${(yearlyDeposit - ira[0]
                    ).toLocaleString()} over the account limit. You'll need to deposit the difference into an 401k or Brokerage account.`;
            }
        // Over 50, IRA
        } else if (currentAge >= 50 && account === 'IRA') {
            if (yearlyDeposit < ira[1]) {
                return `With a ${account}, you can invest up to $${ira[1].toLocaleString()
                    }/yr. Based on your monthly deposit, you can invest $${(ira[1] - yearlyDeposit
                    ).toLocaleString()} more before reaching the account limit.`;
            } else if (yearlyDeposit === ira[1]) {
                return `You've reached the max yearly limit with a ${account}. Anything more will need to go into an 401k or Brokerage account.`;
            } else {
                return `With a ${account}, you can invest up to $${ira[1].toLocaleString()
                    }/yr. Based on your monthly deposit, you are $${(yearlyDeposit - ira[1]
                    ).toLocaleString()} over the account limit. You'll need to deposit the difference into an 401k or Brokerage account.`;
            }
        } else {
            return `Your yearly investment is $${yearlyDeposit.toLocaleString()}. There are no limits with a brokerage account.`
        }
    };

    if (!fundingData.account) {
      return;
    } else {
      return limitCalc(userAge, fundingData.deposit, userAccount);
    }
  };

  // Original before limitCalc addition
  const displayOutputCopy = () => {
    const yearlyDeposit = fundingData.deposit * 12;
    const userAge = ageData.currentAge;

    if (!fundingData.account) {
      return;
    } else {
      return `$${yearlyDeposit}, Age: ${userAge}`;
    }
  };

  return (
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
              value={fundingData.investment}
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
              value={fundingData.deposit}
              onChange={handleInputChange}
            />
          </div>
          <div className="fundingHeader">
            <div>Firm</div>
            <select
              className="dollarInput"
              name="firm"
              id="firm"
              value={fundingData.firm}
              onChange={handleInputChange}
            >
              <option></option>
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
              value={fundingData.account}
              onChange={handleInputChange}
            >
              <option></option>
              <option>401k</option>
              <option>IRA</option>
              <option>Brokerage</option>
            </select>
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

export default Funding;
