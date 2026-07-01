import type { Milestone } from "@/types";
import clsx from "clsx";

interface MilestoneTrackerProps {
  milestones: Milestone[];
  currentSavings: number;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AZN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MilestoneTracker({
  milestones,
  currentSavings,
}: MilestoneTrackerProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
        Milestones
      </h2>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        Track your progress toward Financial Independence
      </p>

      <div className="flex flex-col gap-4">
        {milestones.map((milestone) => {
          const progressToMilestone = Math.min(
            (currentSavings / milestone.amount) * 100,
            100,
          );

          return (
            <div key={milestone.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                      milestone.reached
                        ? "bg-green-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400",
                    )}
                  >
                    {milestone.reached ? "✓" : "○"}
                  </span>
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      milestone.reached
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    {milestone.label}
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {formatCurrency(milestone.amount)}
                </span>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={clsx(
                    "h-full rounded-full transition-all duration-500",
                    milestone.reached ? "bg-green-500" : "bg-blue-500",
                  )}
                  style={{ width: `${progressToMilestone}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 dark:text-slate-500 text-right">
                {progressToMilestone.toFixed(1)}%
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
