import type { FIResult } from "@/types";
import clsx from "clsx";

interface ResultCardProps {
  result: FIResult;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  accent?: "blue" | "green" | "amber";
}

function StatCard({ label, value, sub, accent = "blue" }: StatCardProps) {
  const accentClass = {
    blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    green:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    amber:
      "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
  }[accent];

  const valueClass = {
    blue: "text-blue-700 dark:text-blue-300",
    green: "text-green-700 dark:text-green-300",
    amber: "text-amber-700 dark:text-amber-300",
  }[accent];

  return (
    <div
      className={clsx("rounded-xl border p-4 flex flex-col gap-1", accentClass)}
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className={clsx("text-2xl font-bold", valueClass)}>{value}</p>
      {sub && (
        <p className="text-xs text-slate-500 dark:text-slate-400">{sub}</p>
      )}
    </div>
  );
}

export default function ResultCard({ result }: ResultCardProps) {
  const {
    fiNumber,
    yearsToFI,
    monthlySavings,
    annualExpenses,
    progressPercent,
  } = result;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
        Your FI Results
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard
          label="FI Number"
          value={formatCurrency(fiNumber)}
          sub="Total portfolio needed"
          accent="blue"
        />
        <StatCard
          label="Years to FI"
          value={yearsToFI === Infinity ? "∞" : `${yearsToFI} yrs`}
          sub="Based on current savings rate"
          accent="green"
        />
        <StatCard
          label="Monthly Savings"
          value={formatCurrency(monthlySavings)}
          sub="Going into investments"
          accent="amber"
        />
        <StatCard
          label="Annual Expenses"
          value={formatCurrency(annualExpenses)}
          sub="Your yearly spending"
          accent="blue"
        />
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Progress to FI</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Based on the 4% withdrawal rule (25x annual expenses)
        </p>
      </div>
    </div>
  );
}
