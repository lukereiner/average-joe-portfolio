import React, { useEffect, useState, useContext } from "react";
import "./Returns.css";
import { AppContext } from "../../AppContext";
import data from "../lists.json";
import { stepClasses } from "@mui/material";

const ReturnsData = () => {
  // INVESTOR RISK PROFILES
  const investorProfiles = {
    1: "Conservative",
    2: "Moderately Conservative",
    3: "Moderate",
    4: "Moderately Aggressive",
    5: "Aggressive",
  };

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
  const largeCapAmt = initDeposit * largeCapWeight;
  const smallCapAmt = initDeposit * smallCapWeight;
  const internationalAmt = initDeposit * internationalWeight;
  const bondAmt = initDeposit * bondWeight;
  const cashAmt = initDeposit * cashWeight;

  // FETCH AND HANDLE YAHOO FINANCE
  const [stockPrices, setStockPrices] = useState([]);
  const [expRatio, setExpRatio] = useState([]);
  const symbols = [largeCapFund, smallCapFund, internationalFund, bondFund];
  const [loading, setLoading] = useState(true);
  const [averageMonthlyReturn, setAverageMonthlyReturn] = useState([]);
  const [averagePortfolioReturn, setAveragePortfolioReturn] = useState([]);

  useEffect(() => {
    fetch(
      `http://192.168.50.11:3001/api/stockPrices/historical?symbols=${symbols.join(
        ","
      )}`
    )
      .then((res) => res.json())
      .then((stockData) => {
        setStockPrices(stockData);

        // LOOPS THROUGH EACH SUBARRAY AND ASSIGNS HISTORICAL PRICES TO EACH FUND
        if (stockData.length > 0) {
          let monthlyData = {};
          for (let i = 0; i < stockData.length; i++) {
            let monthlyPrices = [];
            for (let z = 0; z < stockData[i].length; z++) {
              monthlyPrices.push(stockData[i][z].adjClose);
            }

            monthlyData[symbols[i]] = monthlyPrices;

            if (i > 3) {
              break;
            }
          }

          // Calculate average monthly return for each symbol
          let avgReturns = {};
          for (let symbol in monthlyData) {
            if (monthlyData.hasOwnProperty(symbol)) {
              const prices = monthlyData[symbol];
              let monthlyDelta = [];
              for (let i = 0; i < monthlyData[symbol].length - 1; i += 1) {
                if (i >= monthlyData[symbol].length) {
                  break;
                }
                const monthReturn = (prices[i + 1] - prices[i]) / prices[i];
                monthlyDelta.push(monthReturn);
              }
              let sum = 0;
              monthlyDelta.forEach((number) => {
                sum += number;
              });

              avgReturns[symbol] = (sum / monthlyDelta.length) * 12;
            }
          }
          console.log(avgReturns);
          setAverageMonthlyReturn(avgReturns);
        }

        setLoading(false);
      });
  }, []);

  // GRABS AND SET EXPENSE RATIOS FOR FUNDS
  useEffect(() => {
    fetch(
      `http://192.168.50.11:3001/api/stockPrices/insights?symbols=${symbols.join(
        ","
      )}`
    )
      .then((res) => res.json())
      .then((stockInsights) => {
        // Log the priceListEarliest only once after fetching data
        if (stockInsights.length > 0) {
          const expList = [];
          for (let i = 0; i < stockInsights.length; i++) {
            const firstItem = stockInsights[i]["netExpenseRatio"]; // Access the first element directly
            expList.push(firstItem);

            // Stop adding once we have 4 elements
            if (expList.length >= 4) {
              setExpRatio(expList);
              break;
            }
          }
        }
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const portfolioReturn = () => {
    let largeRetBegin = earlypriceplaceholder[0];
    let largeRetEnd = latestpriceplaceholder[0];
    let largeRetPercent = (
      ((largeRetEnd - largeRetBegin) / largeRetBegin) *
      100
    ).toFixed(2);

    let smallRetBegin = earlypriceplaceholder[1];
    let smallRetEnd = latestpriceplaceholder[1];
    let smallRetPercent = (
      ((smallRetEnd - smallRetBegin) / smallRetBegin) *
      100
    ).toFixed(2);

    let intRetBegin = earlypriceplaceholder[2];
    let intRetEnd = latestpriceplaceholder[2];
    let intRetPercent = (
      ((intRetEnd - intRetBegin) / intRetBegin) *
      100
    ).toFixed(2);

    let bondRetBegin = earlypriceplaceholder[3];
    let bondRetEnd = latestpriceplaceholder[3];
    let bondRetPercent = (
      ((bondRetEnd - bondRetBegin) / bondRetBegin) *
      100
    ).toFixed(2);

    // WEIGHTING
    let portReturn = (
      largeRetPercent * largeCapWeight +
      smallRetPercent * smallCapWeight +
      intRetPercent * internationalWeight +
      bondRetPercent * bondWeight
    ).toFixed(0);

    return portReturn;
  };

  const expensePrint = () => {
    let arr = [];
    expRatio.forEach((etf, index) => {
      arr.push(`${symbols[index]}: ${etf}% `);
    });
    return arr;
  };

  return (
    <div>
      <div className="avgReturn">
        <strong>Average Return:</strong> 10%
        <div>Port Return: {portfolioReturn}%</div>
        <div>Expense Ratios: {expensePrint()}</div>
        <div>
          Annualized Return: {(averageMonthlyReturn["SCHK"] * 100).toFixed(2)}%
        </div>
      </div>
      <div className="estValue">
        <strong>Estimated Value:</strong> $1.5M
      </div>
    </div>
  );
};

export default ReturnsData;
