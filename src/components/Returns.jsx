import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Returns.css";
import ReturnsData from "./ReturnsData";

const chartData = [
  {
    year: "0",
    amt: 100,
  },
  {
    year: "5",
    amt: 500,
  },
  {
    year: "10",
    amt: 1500,
  },
  {
    year: "20",
    amt: 3500,
  },
];

const formatNumber = (number) => {
  return number.toLocaleString();
};

const Returns = () => {

  return (
    <>
      <h2>Portfolio Value</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="year"
              tick={{ fill: "white" }}
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
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amt"
              stroke="#000000"
              fill="#bbf7d0"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    <ReturnsData />
    </>
  );
};

export default Returns;
