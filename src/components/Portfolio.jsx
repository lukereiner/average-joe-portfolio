import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./Portfolio.css";

// Sample data for the pie chart
const data = [
  { name: "Large", value: 2650 },
  { name: "Small", value: 1000 },
  { name: "Int'l", value: 1250 },
  { name: "Bonds", value: 1200 },
  { name: "Cash", value: 1000 },
];

// Filter out data with a value of 0
const filteredData = data.filter((entry) => entry.value > 0);

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

const Portfolio = () => {
  return (
    <>
      <div className="basePortfolio">
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
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="table">
          <table>
            <tr>
              <th id="leftFund">Investment Fund</th>
              <th>Initial</th>
              <th>Monthly</th>
            </tr>
            <tr>
              <td className="left">Large Cap (SCHK)</td>
              <td>$2,650</td>
              <td>$318</td>
            </tr>
            <tr>
              <td className="left">Small Cap (SCHA)</td>
              <td>$1,000</td>
              <td>$120</td>
            </tr>
            <tr>
              <td className="left">International (SCHF)</td>
              <td>$1,250</td>
              <td>$150</td>
            </tr>
            <tr>
              <td className="left">Bonds (SCHZ)</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
            <tr>
              <td className="left">Cash</td>
              <td>$100</td>
              <td>$12</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
