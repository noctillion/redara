import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";

const ScatterBasic = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="intro">{payload[0].payload.author}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={300}
        height={100}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="PC1" name="stature" />
        <YAxis type="number" dataKey="PC2" name="weight" />
        {/* <Tooltip cursor={{ strokeDasharray: "3 3" }} /> */}
        <LabelList dataKey="author" />
        {/* <Tooltip /> */}
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={0} stroke="#000" />
        <Scatter name="A school" fill="#8884d8">
          {/* <LabelList dataKey="author" /> */}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterBasic;
