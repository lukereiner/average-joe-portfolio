import React, { useEffect, useState, useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Returns.css";
import { AppContext } from "../../AppContext";
import data from "../lists.json";

const Returns = () => {

  const formatNumber = (number) => {
    return `$${number.toLocaleString()}`;
  };

  // INVESTOR RISK PROFILES
  const investorProfiles = {
    1: "Conservative",
    2: "Moderately Conservative",
    3: "Moderate",
    4: "Moderately Aggressive",
    5: "Aggressive",
  };

  const { ageData, fundingData, riskData } = useContext(AppContext);
  const initDeposit = parseInt(fundingData.investment);
  const monthlyDeposit = parseInt(fundingData.deposit);
  const firm = fundingData.firm;
  const portRisk = riskData.risk;
  const yearsToInvest = ageData.retireAge - ageData.currentAge;

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

  // FETCH AND HANDLE YAHOO FINANCE
  const [stockPrices, setStockPrices] = useState([]);
  const [expRatio, setExpRatio] = useState([]);
  const symbols = [largeCapFund, smallCapFund, internationalFund, bondFund];
  const [loading, setLoading] = useState(true);
  const [averageMonthlyReturn, setAverageMonthlyReturn] = useState([]);

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
          //console.log(avgReturns);
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
            expList.push(firstItem / 100);

            // Stop adding once we have 4 elements
            if (expList.length >= 4) {
              setExpRatio(expList);
              break;
            }
          }
        }
      });
  }, []);

  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const portfolioReturn = () => {
    let largeRetPercent = averageMonthlyReturn[largeCapFund] * largeCapWeight;
    let smallRetPercent = averageMonthlyReturn[smallCapFund] * smallCapWeight;
    let internationalRetPercent =
      averageMonthlyReturn[internationalFund] * internationalWeight;
    let bondRetPercent = averageMonthlyReturn[bondFund] * bondWeight;

    const portReturn =
      largeRetPercent +
      smallRetPercent +
      internationalRetPercent +
      bondRetPercent;

    return portReturn;
  };

  // CALCULATE PORTFOLIO VALUE OVER TIME
  const portfolioValues = [];
  const portfolioValue = () => {
    const returnPercent = portfolioReturn();
    let currentValue = initDeposit; // Initial investment from Funding.jsx

    for (let year = 1; year <= yearsToInvest; year++) {
      const portFees =
        largeCapWeight * expRatio[0] +
        smallCapWeight * expRatio[1] +
        internationalWeight * expRatio[2] +
        bondWeight * expRatio[3]; // Fees per year as a percentage (i.e. 0.05%)
      const inflation = 0.03; // Assume 3% inflation

      for (let month = 1; month <= 12; month++) {
        let monthlyCompoundRate = (1 + returnPercent) ** (1 / 12) - 1;
        currentValue += monthlyDeposit; // Monthly deposit from Funding.jsx
        currentValue *= 1 + monthlyCompoundRate;
      }
      currentValue *= 1 - portFees; // Reduce amount by portFees
      currentValue *= 1 - inflation;

      portfolioValues.push(currentValue.toFixed(0));
    }
    return portfolioValues;
  };

  portfolioValue();

  const formattedPortfolioValues = portfolioValues.map((value) =>
    formatNumberWithCommas(parseInt(value))
  );

  return (
    <>
      <h2>Portfolio Value</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={530}
            height={400}
            data={portfolioValues.map((value, index) => ({
              year: index.toString(),
              amt: parseInt(value),
            }))}
            margin={{
              top: 0,
              right: 10,
              left: 35,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 1" strokeOpacity={0.4}/>
            <XAxis
              dataKey="year"
              tick={{ fill: "white" }}
              ticks={(() => {
                const tickInterval = Math.ceil(yearsToInvest / 5);
                const lastYear = (portfolioValues.length - 1).toString();
                const ticks = portfolioValues
                  .map((_, index) => index.toString())
                  .filter((year, index) => index % tickInterval === 0);
                if (!ticks.includes(lastYear)) {
                  ticks.push(lastYear);
                }
                return ticks;
              })()}
              stroke="white"
              label={{
                value: "Year",
                position: "insideBottom",
                offset: -15,
                fill: "white",
              }}
            />
            <YAxis
              tick={{ fill: "white" }}
              stroke="white"
              tickFormatter={formatNumber}
            />
            <Tooltip formatter={(value) => formatNumberWithCommas(value)} />
            <Area
              type="monotone"
              dataKey="amt"
              stroke="#000000"
              fill="#bbf7d0"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="avgReturn">
        <div>
          <strong>Average Return: </strong>
          {(portfolioReturn() * 100).toFixed(0)}%
        </div>
      </div>
      <div className="estValue">
        <div>
          <strong>Estimated Value:</strong> $
          {formattedPortfolioValues[yearsToInvest - 1]}
        </div>
      </div>
    </>
  );
};

export default Returns;
