import React, { useContext } from "react";
import "./Portfolio.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { AppContext } from "../../AppContext";
import data from "../lists.json";

const PiePlate = () => {
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
  const largeCapAmt = initDeposit * largeCapWeight;
  const smallCapAmt = initDeposit * smallCapWeight;
  const internationalAmt = initDeposit * internationalWeight;
  const bondAmt = initDeposit * bondWeight;
  const cashAmt = initDeposit * cashWeight;

  // Sample data for the pie chart
  const pieData = [
    { name: "Large", value: largeCapAmt },
    { name: "Small", value: smallCapAmt },
    { name: "Int'l", value: internationalAmt },
    { name: "Bonds", value: bondAmt },
    { name: "Cash", value: cashAmt },
  ];

  // Filter out data with a value of 0
  const filteredData = pieData.filter((entry) => entry.value > 0);

  // Array of colors for the pie slices
  const COLORS = ["2f2e2e", "#052e16", "#166534", "#16a34a", "#4ade80"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Calculate the midpoint radius
    const x = cx + radius * Math.cos(-midAngle * RADIAN); // Calculate the x position
    const y = cy + radius * Math.sin(-midAngle * RADIAN); // Calculate the y position

    // Adjust the text anchor and position to center the label
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle" // Center the text horizontally
        dominantBaseline="middle" // Center the text vertically
      >
        {`${filteredData[index].name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="pieChart" style={{ width: "100%", height: 400 }}>
      <PieChart width={400} height={400}>
        <Pie
          data={filteredData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label={renderCustomizedLabel}
          labelLine={false} // Remove the lines
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default PiePlate;
