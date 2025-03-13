import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Returns.css";

const data = [
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
      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
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
              label={{
                value: "Amount",
                angle: -90,
                position: "insideLeft",
                offset: -5,
                fill: "white",
              }}
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
    </>
  );
};

export default Returns;
