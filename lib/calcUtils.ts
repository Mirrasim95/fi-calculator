import type {
  UserInputs,
  FIResult,
  GrowthPoint,
  ScenarioData,
  Milestone,
} from "@/types";

const WITHDRAWAL_RATE = 0.04;
const FI_MULTIPLIER = 1 / WITHDRAWAL_RATE;

export function calculateFINumber(monthlyExpenses: number): number {
  const annualExpenses = monthlyExpenses * 12;
  return annualExpenses * FI_MULTIPLIER;
}

export function calculateMonthlySavings(
  monthlyIncome: number,
  savingsRate: number,
): number {
  return monthlyIncome * (savingsRate / 100);
}

export function calculateYearsToFI(
  currentSavings: number,
  monthlySavings: number,
  annualReturn: number,
  fiNumber: number,
): number {
  if (currentSavings >= fiNumber) return 0;
  if (monthlySavings <= 0) return Infinity;

  const monthlyRate = annualReturn / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  const maxMonths = 600; // max 50 years

  while (balance < fiNumber && months < maxMonths) {
    balance = balance * (1 + monthlyRate) + monthlySavings;
    months++;

    if (!isFinite(balance) || balance <= 0) return Infinity;
  }

  if (months >= maxMonths) return Infinity;

  return Math.round((months / 12) * 10) / 10;
}

export function calculateProgressPercent(
  currentSavings: number,
  fiNumber: number,
): number {
  if (fiNumber <= 0) return 0;
  const percent = (currentSavings / fiNumber) * 100;
  return Math.min(Math.round(percent * 10) / 10, 100);
}

export function calculateFIResult(inputs: UserInputs): FIResult {
  const annualExpenses = inputs.monthlyExpenses * 12;
  const fiNumber = calculateFINumber(inputs.monthlyExpenses);
  const monthlySavings = calculateMonthlySavings(
    inputs.monthlyIncome,
    inputs.savingsRate,
  );
  const yearsToFI = calculateYearsToFI(
    inputs.currentSavings,
    monthlySavings,
    inputs.annualReturn,
    fiNumber,
  );
  const progressPercent = calculateProgressPercent(
    inputs.currentSavings,
    fiNumber,
  );

  return {
    fiNumber,
    yearsToFI,
    monthlySavings,
    annualExpenses,
    progressPercent,
  };
}

export function buildGrowthData(
  inputs: UserInputs,
  fiNumber: number,
  yearsToFI: number,
): GrowthPoint[] {
  // if yearsToFI is Infinity, return empty array — no chart
  if (!isFinite(yearsToFI) || yearsToFI <= 0) return [];

  const monthlyRate = inputs.annualReturn / 100 / 12;
  const monthlySavings = calculateMonthlySavings(
    inputs.monthlyIncome,
    inputs.savingsRate,
  );

  const totalYears = Math.min(Math.ceil(yearsToFI) + 2, 52); // max 52 years
  const points: GrowthPoint[] = [];
  let balance = inputs.currentSavings;

  for (let year = 0; year <= totalYears; year++) {
    points.push({
      year,
      portfolioValue: Math.round(balance),
      fiNumber: Math.round(fiNumber),
    });

    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlySavings;
      if (!isFinite(balance)) break;
    }
  }

  return points;
}

export function buildScenarios(inputs: UserInputs): ScenarioData[] {
  const fiNumber = calculateFINumber(inputs.monthlyExpenses);

  const scenarioConfigs = [
    { label: "Conservative", savingsRate: 20, color: "#D97706" },
    { label: "Moderate", savingsRate: 40, color: "#2563EB" },
    { label: "Aggressive", savingsRate: 60, color: "#16A34A" },
  ];

  return scenarioConfigs.map((config) => {
    const monthlySavings = calculateMonthlySavings(
      inputs.monthlyIncome,
      config.savingsRate,
    );
    const yearsToFI = calculateYearsToFI(
      inputs.currentSavings,
      monthlySavings,
      inputs.annualReturn,
      fiNumber,
    );

    return {
      label: config.label,
      savingsRate: config.savingsRate,
      yearsToFI,
      fiNumber,
      color: config.color,
    };
  });
}

export function buildMilestones(
  currentSavings: number,
  fiNumber: number,
): Milestone[] {
  const percentages = [25, 50, 75, 100];

  return percentages.map((percent) => {
    const amount = fiNumber * (percent / 100);
    return {
      label: `${percent}% of FI`,
      percent,
      amount,
      reached: currentSavings >= amount,
    };
  });
}