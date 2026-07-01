# 💰 FI Calculator

A Financial Independence Calculator built with Next.js and TypeScript.
Calculate how long it will take to reach financial independence based on your income, expenses and savings rate.

## 🔗 Live Demo

[fi-calculator-five.vercel.app](https://fi-calculator-five.vercel.app)

## 🛠 Tech Stack

- **Next.js 16** — framework
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Zod** — form validation
- **Recharts** — interactive charts
- **next-themes** — dark/light mode
- **clsx** — conditional classnames

## ✨ Features

- Real-time FI Number calculation (4% rule — 25x annual expenses)
- Years to Financial Independence estimation
- Portfolio growth line chart
- Income breakdown pie chart
- Scenario comparison (Conservative / Moderate / Aggressive)
- Milestone tracker (25%, 50%, 75%, 100% of FI)
- Dark / Light mode
- Fully responsive (mobile & desktop)
- AZN (₼) currency

## 🚀 Getting Started

```bash
git clone https://github.com/Mirrasim95/fi-calculator.git
cd fi-calculator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📐 Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout, ThemeProvider
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── InputForm.tsx        # Form with Zod validation
│   ├── ResultCard.tsx       # FI results display
│   ├── GrowthChart.tsx      # Portfolio growth chart
│   ├── BreakdownChart.tsx   # Income breakdown chart
│   ├── ScenarioTable.tsx    # Scenario comparison
│   ├── MilestoneTracker.tsx # Milestone progress
│   └── ThemeToggle.tsx      # Dark/light toggle
├── lib/
│   ├── calcUtils.ts         # FI calculation logic
│   └── schemas.ts           # Zod schemas
├── data/
│   └── mockData.ts          # Demo data
└── types/
    └── index.ts             # TypeScript interfaces
```

## 📊 How It Works

Based on the **4% Safe Withdrawal Rate** (FIRE movement):

- **FI Number** = Annual Expenses × 25
- **Years to FI** = Compound growth calculation with monthly contributions
- **Progress** = Current Savings / FI Number × 100
