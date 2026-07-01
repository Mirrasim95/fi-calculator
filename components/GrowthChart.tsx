"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { GrowthPoint } from "@/types";

interface GrowthChartProps {
  data: GrowthPoint[];
  yearsToFI: number;
}

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatTooltipValue(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function GrowthChart({ data, yearsToFI }: GrowthChartProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Portfolio Growth
      </h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        Projected portfolio value vs FI target over time
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            strokeOpacity={0.5}
          />

          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            label={{
              value: "Years",
              position: "insideBottom",
              offset: -2,
              fontSize: 11,
              fill: "#94a3b8",
            }}
          />

          <YAxis
            tickFormatter={formatYAxis}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            width={60}
          />

          <Tooltip
            formatter={(value: number, name: string) => [
              formatTooltipValue(value),
              name === "portfolioValue" ? "Portfolio" : "FI Target",
            ]}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
          />

          <Legend
            formatter={(value) =>
              value === "portfolioValue" ? "Portfolio Value" : "FI Target"
            }
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
          />

          {yearsToFI !== Infinity && (
            <ReferenceLine
              x={Math.round(yearsToFI)}
              stroke="#16a34a"
              strokeDasharray="4 4"
              label={{
                value: "FI!",
                position: "top",
                fontSize: 11,
                fill: "#16a34a",
              }}
            />
          )}

          <Line
            type="monotone"
            dataKey="portfolioValue"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="fiNumber"
            stroke="#dc2626"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
