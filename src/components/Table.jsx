import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import data from "../lists.json";
import './Table.css'

const investorProfiles = {
  1: "Conservative",
  2: "Moderately Conservative",
  3: "Moderate",
  4: "Moderately Aggressive",
  5: "Aggressive",
};

const Table = () => {
  const { ageData, fundingData, riskData } = useContext(AppContext);
  const initDeposit = fundingData.investment;
  const monthlyDeposit = fundingData.deposit;
  const account = fundingData.account;
  const firm = fundingData.firm;
  const portRisk = riskData.risk;

  // FUNDS
  const largeCapFund = data.FUNDS[firm]["US Stock"]["Large Cap"]["Mutual Fund"];
  const smallCapFund = data.FUNDS[firm]["US Stock"]["Small Cap"]["Mutual Fund"];
  const internationalFund =
    data.FUNDS[firm]["International Stock"]["Total International Market"][
      "Mutual Fund"
    ];
  const bondFund = data.FUNDS[firm]["Bond"]["Total US Market"]["Mutual Fund"];

  // WEIGHTS
  const largeCapWeight =
    data.WEIGHT[investorProfiles[portRisk]]["US Stock"]["US Large Cap"];
  const smallCapWeight =
    data.WEIGHT[investorProfiles[portRisk]]["US Stock"]["US Small Cap"];
  const internationalWeight =
    data.WEIGHT[investorProfiles[portRisk]]["International Stock"][
      "Total International Market"
    ];
  const bondWeight =
    data.WEIGHT[investorProfiles[portRisk]]["Bond"]["Total US Bond Market"];
  const cashWeight = data.WEIGHT[investorProfiles[portRisk]]["Cash"]["CASH"];

  // PORTFOLIO BREAKDOWN
  const largeCapAmt = (initDeposit * largeCapWeight).toLocaleString();
  const largeCapAmtMonth = (monthlyDeposit * largeCapWeight).toLocaleString();
  const smallCapAmt = (initDeposit * smallCapWeight).toLocaleString();
  const smallCapAmtMonth = (monthlyDeposit * smallCapWeight).toLocaleString();
  const internationalAmt = (initDeposit * internationalWeight).toLocaleString();
  const internationalAmtMonth = (monthlyDeposit * internationalWeight).toLocaleString();
  const bondAmt = (initDeposit * bondWeight).toLocaleString();
  const bondAmtMonth = (monthlyDeposit * bondWeight).toLocaleString();
  const cashAmt = (initDeposit * cashWeight).toLocaleString();
  const cashAmtMonth = (monthlyDeposit * cashWeight).toLocaleString();

  return (
    <div className="table">
      <table>
        <tr>
          <th id="leftFund">Investment Fund</th>
          <th>Initial</th>
          <th>Monthly</th>
        </tr>
        <tr>
          <td className="left">Large Cap ({largeCapFund})</td>
          <td className="right">${largeCapAmt}</td>
          <td className="right">${largeCapAmtMonth}</td>
        </tr>
        <tr>
          <td className="left">Small Cap ({smallCapFund})</td>
          <td className="right">${smallCapAmt}</td>
          <td className="right">${smallCapAmtMonth}</td>
        </tr>
        <tr>
          <td className="left">International ({internationalFund})</td>
          <td className="right">${internationalAmt}</td>
          <td className="right">${internationalAmtMonth}</td>
        </tr>
        <tr>
          <td className="left">Bonds ({bondFund})</td>
          <td className="right">${bondAmt}</td>
          <td className="right">${bondAmtMonth}</td>
        </tr>
        <tr>
          <td className="left">Cash</td>
          <td className="right">${cashAmt}</td>
          <td className="right">${cashAmtMonth}</td>
        </tr>
      </table>
    </div>
  );
};

export default Table;
