"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { UserInputs } from "@/types";

interface BreakdownChartProps {
  inputs: UserInputs;
  monthlySavings: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AZN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BreakdownChart({
  inputs,
  monthlySavings,
}: BreakdownChartProps) {
  const expenses = inputs.monthlyExpenses;
  const savings = monthlySavings;
  const other = Math.max(0, inputs.monthlyIncome - expenses - savings);

  const data = [
    { name: "Savings", value: savings, color: "#2563eb" },
    { name: "Expenses", value: expenses, color: "#dc2626" },
    ...(other > 0 ? [{ name: "Other", value: other, color: "#94a3b8" }] : []),
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Income Breakdown
      </h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        How your monthly income is allocated
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number, name: string) => [
              formatCurrency(value),
              name,
            ]}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
          />

          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-0.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.name}
            </p>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
