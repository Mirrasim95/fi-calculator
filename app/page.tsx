"use client";

import { useState, useMemo } from "react";
import { mockData } from "@/data/mockData";
import {
  calculateFIResult,
  buildGrowthData,
  buildScenarios,
  buildMilestones,
} from "@/lib/calcUtils";
import type { UserInputs } from "@/types";

import InputForm from "@/components/InputForm";
import ResultCard from "@/components/ResultCard";
import GrowthChart from "@/components/GrowthChart";
import BreakdownChart from "@/components/BreakdownChart";
import ScenarioTable from "@/components/ScenarioTable";
import MilestoneTracker from "@/components/MilestoneTracker";
import ThemeToggle from "@/components/ThemeToggle";

function isValidInputs(inputs: UserInputs): boolean {
  return (
    inputs.monthlyIncome > 0 &&
    inputs.monthlyExpenses > 0 &&
    inputs.savingsRate > 0 &&
    inputs.annualReturn > 0 &&
    inputs.monthlyExpenses < inputs.monthlyIncome
  );
}

export default function Home() {
  const [inputs, setInputs] = useState<UserInputs>(mockData);

  const safeInputs = useMemo(
    () => (isValidInputs(inputs) ? inputs : mockData),
    [inputs]
  );

  const result = useMemo(() => calculateFIResult(safeInputs), [safeInputs]);

  const growthData = useMemo(() => {
    if (!isFinite(result.yearsToFI) || result.yearsToFI <= 0) return [];
    return buildGrowthData(safeInputs, result.fiNumber, result.yearsToFI);
  }, [safeInputs, result.fiNumber, result.yearsToFI]);

  const scenarios = useMemo(() => buildScenarios(safeInputs), [safeInputs]);

  const milestones = useMemo(
    () => buildMilestones(inputs.currentSavings, result.fiNumber),
    [inputs.currentSavings, result.fiNumber]
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              💰 FI Calculator
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Financial Independence Calculator
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <InputForm values={inputs} onChange={setInputs} />
            <MilestoneTracker
              milestones={milestones}
              currentSavings={inputs.currentSavings}
            />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <ResultCard result={result} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrowthChart data={growthData} yearsToFI={result.yearsToFI} />
              <BreakdownChart
                inputs={safeInputs}
                monthlySavings={result.monthlySavings}
              />
            </div>

            <ScenarioTable
              scenarios={scenarios}
              currentSavingsRate={inputs.savingsRate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}