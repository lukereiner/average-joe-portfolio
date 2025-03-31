import React, { useContext } from "react";
import { AppContext } from "../../AppContext";
import data from "../lists.json";
import "./Table.css";

const investorProfiles = {
  1: "Conservative",
  2: "Moderately Conservative",
  3: "Moderate",
  4: "Moderately Aggressive",
  5: "Aggressive",
};

const formatNumberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Table = () => {
  const { ageData, fundingData, riskData } = useContext(AppContext);
  const initDeposit = fundingData.investment;
  const monthlyDeposit = fundingData.deposit;
  const account = fundingData.account;
  const firm = fundingData.firm;
  const portRisk = riskData.risk;

  // FUNDS
  const largeCapFund = data.FUNDS[firm]["US Stock"]["Large Cap"]["ETF"];
  const smallCapFund = data.FUNDS[firm]["US Stock"]["Small Cap"]["ETF"];
  const internationalFund =
    data.FUNDS[firm]["International Stock"]["Total International Market"][
      "ETF"
    ];
  const bondFund = data.FUNDS[firm]["Bond"]["Total US Market"]["ETF"];

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
  const largeCapAmt = (initDeposit * largeCapWeight).toFixed(0);
  const largeCapAmtMonth = (monthlyDeposit * largeCapWeight).toFixed(0);
  const smallCapAmt = (initDeposit * smallCapWeight).toFixed(0);
  const smallCapAmtMonth = (monthlyDeposit * smallCapWeight).toFixed(0);
  const internationalAmt = (initDeposit * internationalWeight).toFixed(0);
  const internationalAmtMonth = (
    monthlyDeposit * internationalWeight
  ).toFixed(0);
  const bondAmt = (initDeposit * bondWeight).toFixed(0);
  const bondAmtMonth = (monthlyDeposit * bondWeight).toFixed(0);
  const cashAmt = (initDeposit * cashWeight).toFixed(0);
  const cashAmtMonth = (monthlyDeposit * cashWeight).toFixed(0);

  return (
    <div className="table">
      <table>
        <tbody>
          <tr>
            <th id="leftFund">Investment Fund</th>
            <th>Initial</th>
            <th>Monthly</th>
          </tr>
          <tr>
            <td className="left">Large Cap ({largeCapFund})</td>
            <td className="right">${formatNumberWithCommas(largeCapAmt)}</td>
            <td className="right">${formatNumberWithCommas(largeCapAmtMonth)}</td>
          </tr>
          <tr>
            <td className="left">Small Cap ({smallCapFund})</td>
            <td className="right">${formatNumberWithCommas(smallCapAmt)}</td>
            <td className="right">${formatNumberWithCommas(smallCapAmtMonth)}</td>
          </tr>
          <tr>
            <td className="left">International ({internationalFund})</td>
            <td className="right">${formatNumberWithCommas(internationalAmt)}</td>
            <td className="right">${formatNumberWithCommas(internationalAmtMonth)}</td>
          </tr>
          <tr>
            <td className="left">Bonds ({bondFund})</td>
            <td className="right">${formatNumberWithCommas(bondAmt)}</td>
            <td className="right">${formatNumberWithCommas(bondAmtMonth)}</td>
          </tr>
          <tr>
            <td className="left">Cash</td>
            <td className="right">${formatNumberWithCommas(cashAmt)}</td>
            <td className="right">${formatNumberWithCommas(cashAmtMonth)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
