"use client";

import * as React from "react";
import { Chart } from "react-charts";

interface OverviewProps {
  data: {
    name: string;
    total: number;
  }[];
  yAxisPrefix?: string;
  barColor?: string;
  height?: number;
}

const Overview: React.FC<OverviewProps> = ({
  data,
  yAxisPrefix = "$",
  barColor = "#3b82f6", // Tailwind blue-500
  height = 350,
}) => {
  // Shape data for react-charts
  const chartData = React.useMemo(
    () => [
      {
        label: "Revenue",
        data: data.map((d) => ({
          primary: d.name,
          secondary: d.total,
        })),
      },
    ],
    [data]
  );

  // X axis (categories)
  const primaryAxis = React.useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getValue: (d: any) => d.primary,
    }),
    []
  );

  // Y axis (numeric values)
  const secondaryAxes = React.useMemo(
    () => [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getValue: (d: any) => d.secondary,
        formatters: {
          scale: (value: number) => {
            if (value >= 1_000_000)
              return `${yAxisPrefix}${(value / 1_000_000).toFixed(1)}M`;
            if (value >= 1_000)
              return `${yAxisPrefix}${(value / 1_000).toFixed(1)}K`;
            return `${yAxisPrefix}${value}`;
          },
        },
      },
    ],
    [yAxisPrefix]
  );

  return (
    <div className="w-full">
      {/* Card container */}
      <div className=" ">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Revenue Overview
        </h2>

        <div
          className="w-full"
          style={{ height }}
          role="img"
          aria-label="Revenue overview bar chart"
        >
          <Chart
            options={{
              data: chartData,
              primaryAxis,
              secondaryAxes,
              getSeriesStyle: () => ({
                color: barColor,
                opacity: 0.9,
              }),
              tooltip: {
                render: ({ focusedDatum }) => {
                  if (!focusedDatum) return null;
                  const val = focusedDatum.secondaryValue ?? 0;
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
                      <p className="text-sm font-medium text-gray-800">
                        {focusedDatum.primaryValue}
                      </p>
                      <p className="text-base font-semibold text-blue-600">
                        {yAxisPrefix}
                        {val.toLocaleString()}
                      </p>
                    </div>
                  );
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
