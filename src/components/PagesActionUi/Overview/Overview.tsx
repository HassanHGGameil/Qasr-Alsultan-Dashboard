"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: {
    name: string;
    total: number;
  }[];
  showGrid?: boolean;
  showTooltip?: boolean;
  barSize?: number;
  barColor?: string;
  yAxisPrefix?: string;
}

const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tickFormatter={(value: any) => `$${value}`}
        />

        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />


      </BarChart>
    </ResponsiveContainer>
  );
};

export default Overview;
