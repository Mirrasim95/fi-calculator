export interface UserInputs {
  monthlyIncome: number;
  monthlyExpenses: number;
  savingsRate: number;
  annualReturn: number;
  currentSavings: number;
}

export interface FIResult {
  fiNumber: number;
  yearsToFI: number;
  monthlySavings: number;
  annualExpenses: number;
  progressPercent: number;
}

export interface GrowthPoint {
  year: number;
  portfolioValue: number;
  fiNumber: number;
}

export interface ScenarioData {
  label: string;
  savingsRate: number;
  yearsToFI: number;
  fiNumber: number;
  color: string;
}

export interface Milestone {
  label: string;
  percent: number;
  amount: number;
  reached: boolean;
}
