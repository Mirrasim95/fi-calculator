import type { ScenarioData } from "@/types";
import clsx from "clsx";

interface ScenarioTableProps {
  scenarios: ScenarioData[];
  currentSavingsRate: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ScenarioTable({
  scenarios,
  currentSavingsRate,
}: ScenarioTableProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Scenario Comparison
      </h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        How different savings rates affect your path to FI
      </p>

      <div className="grid grid-cols-3 gap-3">
        {scenarios.map((scenario) => {
          const isActive = scenario.savingsRate === currentSavingsRate;

          return (
            <div
              key={scenario.label}
              className={clsx(
                "rounded-xl border p-4 flex flex-col gap-3 transition-all",
                isActive
                  ? "border-blue-400 dark:border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-950"
                  : "border-slate-200 dark:border-slate-700",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${scenario.color}20`,
                    color: scenario.color,
                  }}
                >
                  {scenario.label}
                </span>
                {isActive && (
                  <span className="text-xs text-blue-500 font-medium">
                    Current
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Savings Rate
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: scenario.color }}
                >
                  {scenario.savingsRate}%
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Years to FI
                </p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {scenario.yearsToFI === Infinity
                    ? "∞"
                    : `${scenario.yearsToFI} yrs`}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  FI Number
                </p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {formatCurrency(scenario.fiNumber)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
