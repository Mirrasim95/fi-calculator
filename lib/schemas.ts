import { z } from "zod";

export const userInputsSchema = z
  .object({
    monthlyIncome: z
      .number({ error: "Income must be a number" })
      .min(1, "Income must be greater than 0")
      .max(1_000_000, "Income is too large"),

    monthlyExpenses: z
      .number({ error: "Expenses must be a number" })
      .min(1, "Expenses must be greater than 0"),

    savingsRate: z
      .number({ error: "Savings rate must be a number" })
      .min(1, "Minimum savings rate is 1%")
      .max(100, "Maximum savings rate is 100%"),

    annualReturn: z
      .number({ error: "Return must be a number" })
      .min(0.1, "Minimum return is 0.1%")
      .max(30, "Maximum return is 30%"),

    currentSavings: z
      .number({ error: "Current savings must be a number" })
      .min(0, "Current savings cannot be negative"),
  })
  .refine((data) => data.monthlyExpenses < data.monthlyIncome, {
    message: "Expenses cannot exceed income",
    path: ["monthlyExpenses"],
  });

export type UserInputsSchema = z.infer<typeof userInputsSchema>;
