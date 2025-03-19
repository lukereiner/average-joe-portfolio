import React, { useEffect, useState, useContext } from "react";
import "./Returns.css";
import { AppContext } from "../../AppContext";
import data from "../lists.json";

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
  const symbols = [largeCapFund, smallCapFund, internationalFund, bondFund];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://192.168.50.11:3001/api/stockPrices/historical?symbols=${symbols.join(",")}`)
      .then((res) => res.json())
      .then((stockData) => {
        setStockPrices(stockData);
        setLoading(false);

        // Log the priceListEarliest only once after fetching data
        if (stockData.length > 0) {
          const priceListEarliest = [];
          for (let i = 0; i < stockData.length; i++) {
            const firstItem = stockData[i][0]; // Access the first element directly
            priceListEarliest.push(
              `${symbols[i]} ${firstItem.adjClose.toFixed(2)}`
            );

            // Stop adding once we have 4 elements
            if (priceListEarliest.length >= 4) break;
          }
          console.log(priceListEarliest);
        }

        // Log the priceList only once after fetching data
        if (stockData.length > 0) {
          const priceListLatest = [];
          for (let i = 0; i < stockData.length; i++) {
            const lastIndex = stockData[i].length - 1;
            const lastItem = stockData[i][lastIndex];
            priceListLatest.push(
              `${symbols[i]} ${lastItem.adjClose.toFixed(2)}`
            );

            // Stop adding once we have 4 elements
            if (priceListLatest.length >= 4) break;
          }
          console.log(priceListLatest);
        }
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  /* stockPrices.forEach((subArray, index) => {
    const lastIndex = subArray.length - 1;
    const lastItem = subArray[lastIndex];
    console.log(`Stock Prices Array ${index}: Last Index: ${lastIndex}, Last Item AdjClose: ${lastItem.adjClose.toFixed(2)}`);
  }); */

  /* for (let i = 0; i < 1; i++) {
    const priceList = [];
    stockPrices.forEach((subArray, i) => {
        const lastIndex = subArray.length - 1;
        const lastItem = subArray[lastIndex];
        priceList.push(lastItem.adjClose.toFixed(2));
        i++;
      });
    console.log(priceList);
  }; */

  return (
    <div>
      <div className="avgReturn">
        <strong>Average Return:</strong> 10%
      </div>
      <div className="estValue">
        <strong>Estimated Value:</strong> $1.5M
      </div>
    </div>
  );
};

export default ReturnsData;
