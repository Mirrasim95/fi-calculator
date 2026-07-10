"use client"

import { useState } from "react"
import { userInputsSchema } from "@/lib/schemas"
import type { UserInputs } from "@/types"
import clsx from "clsx"

interface InputFormProps {
  values: UserInputs
  onChange: (values: UserInputs) => void
}

interface FieldConfig {
  key: keyof UserInputs
  min: number
  max: number
  step: number
  label: string
  prefix?: string
  suffix?: string
}

const fields: FieldConfig[] = [
  { key: "monthlyIncome",   label: "Monthly Income",   min: 1,   max: 100000,   step: 100,  prefix: "₼" },
  { key: "monthlyExpenses", label: "Monthly Expenses", min: 1,   max: 100000,   step: 100,  prefix: "₼" },
  { key: "currentSavings",  label: "Current Savings",  min: 0,   max: 10000000, step: 1000, prefix: "₼" },
  { key: "savingsRate",     label: "Savings Rate",     min: 1,   max: 100,      step: 1,    suffix: "%" },
  { key: "annualReturn",    label: "Annual Return",    min: 0.1, max: 30,       step: 0.1,  suffix: "%" },
]

export default function InputForm({ values, onChange }: InputFormProps) {
  const [errors, setErrors] = useState<Partial<Record<keyof UserInputs, string>>>({})
  // raw string values — only used while typing
  const [raw, setRaw] = useState<Partial<Record<keyof UserInputs, string>>>({})
  const [focused, setFocused] = useState<keyof UserInputs | null>(null)

  function handleFocus(key: keyof UserInputs) {
    setFocused(key)
    setRaw((prev) => ({
      ...prev,
      [key]: values[key] === 0 ? "" : String(values[key]),
    }))
  }

  function handleChange(key: keyof UserInputs, value: string) {
    // just update raw string — don't call onChange yet
    setRaw((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleBlur(key: keyof UserInputs) {
    setFocused(null)
    const rawVal = raw[key]
    const num = parseFloat(rawVal ?? "")

    // if invalid or empty — restore previous value, show error
    if (rawVal === "" || isNaN(num)) {
      setRaw((prev) => ({ ...prev, [key]: String(values[key]) }))
      setErrors((prev) => ({ ...prev, [key]: "Please enter a valid number" }))
      return
    }

    const updated = { ...values, [key]: num }
    const result = userInputsSchema.safeParse(updated)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserInputs, string>> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof UserInputs
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      // restore previous valid value
      setRaw((prev) => ({ ...prev, [key]: String(values[key]) }))
      return
    }

    setErrors({})
    onChange(updated) // only call onChange with valid value
  }

  function getDisplayValue(key: keyof UserInputs): string {
    if (focused === key) return raw[key] ?? String(values[key])
    return String(values[key])
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
        Your Numbers
      </h2>

      <div className="flex flex-col gap-5">
        {fields.map(({ key, label, min, max, step, prefix, suffix }) => {
          const error = errors[key]
          return (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {label}
              </label>

              <div className="relative">
                {prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {prefix}
                  </span>
                )}
                <input
                  type="number"
                  value={getDisplayValue(key)}
                  min={min}
                  max={max}
                  step={step}
                  onFocus={() => handleFocus(key)}
                  onBlur={() => handleBlur(key)}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors",
                    "bg-slate-50 dark:bg-slate-900",
                    "text-slate-800 dark:text-slate-100",
                    prefix && "pl-7",
                    suffix && "pr-8",
                    error
                      ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  )}
                />
                {suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                    {suffix}
                  </span>
                )}
              </div>

              {error && (
                <p className="text-xs text-red-500">{error}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}