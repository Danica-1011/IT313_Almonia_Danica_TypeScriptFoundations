# IT313 – Laboratory 3 – Enrollment Eligibility Checker (TypeScript)

## Overview
This repository contains a **type‑safe** implementation of the Enrollment Eligibility Checker required for Laboratory 3 of **IT 313 – Mobile Programming**.  The program:
- Stores enrollee data in a typed `Enrollee[]` array.
- Simulates an asynchronous API call (`getEnrollees`) that returns a `Promise<Enrollee[]>`.
- Calculates each student’s average grade and determines eligibility using a **strict `enum`** (`EnrollmentStatus`).
- Generates a formatted eligibility report, computes class statistics, and demonstrates **union types**, **generics**, **template literals**, and **error handling** with `try / catch`.
- Shows how TypeScript’s **strict mode** catches type mismatches before the code runs.

The project is built with **Node.js**, **TypeScript** (`tsc`), and `ts-node` for direct execution.

---

## Key TypeScript Features Demonstrated
- **`enum`** – `EnrollmentStatus` limits status values to `PASSING` or `PROBATION`.
- **`interface`** – `Enrollee` defines the shape of raw student records.
- **Type alias** – `EligibilityReport` adds an optional `remarks` field for students on probation.
- **Named & default exports** – `computeAverage` (named) and `getStatus` (default) in `gradeUtils.ts`.
- **Union type** – `batchId: string | number` demonstrates narrowing with `typeof`.
- **Generic function** – `groupBy<T>` groups any array by a string key; used to bucket reports by status.
- **`async / await` with `try / catch`** – simulates a remote fetch and handles failures gracefully.
- **Array methods** – `.map()`, `.reduce()`, and the generic `groupBy` illustrate functional data processing.
- **Template literals** – produce clean, readable console output.
- **Strict compiler options** – `strict: true`, `moduleResolution: "Bundler"`, `allowSyntheticDefaultImports: true` ensure maximum type safety.

---

## File Structure
```
IT313_Almonia_Danica_TypeScriptFoundations/
├─ src/
│  ├─ types.ts          # Enum, interface, and type alias definitions
│  ├─ gradeUtils.ts     # computeAverage (named) & getStatus (default) utilities
│  └─ index.ts          # Main async workflow, reporting, and demo code
├─ package.json         # Project metadata and npm scripts
├─ tsconfig.json        # TypeScript configuration (strict mode enabled)
└─ README.md            # This documentation
```

---

## Prerequisites
- **Node.js** (v14 or newer) – download from https://nodejs.org/
- **npm** (bundled with Node) – used to install development dependencies.

---

## Setup & Execution
```bash
# 1. Clone the repository (if you haven’t already)
git clone https://github.com/Danica-1011/IT313_Almonia_Danica_TypeScriptFoundations.git
cd IT313_Almonia_Danica_TypeScriptFoundations

# 2. Install development dependencies
npm install

# 3. Run the program directly from TypeScript (development mode)
npm run dev

# 4. Compile to JavaScript (produces ./dist)
npm run build

# 5. Run the compiled version
npm start
```

---

## Verifying Type Safety (Type‑Error Demo)
1. Open `src/gradeUtils.ts` and temporarily change the first parameter of `computeAverage` to `string`:
```ts
export function computeAverage(prelim: string, midterm: number, final: number): number { … }
```
2. Save the file.
3. Run the type‑check script:
```bash
npm run typecheck
```
4. The compiler will output an error similar to:
```
src/index.ts:23:31 - error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.
```
   This demonstrates how **strict TypeScript catches mismatched types before runtime**.
5. Revert the change (restore `prelim: number`), save, and run `npm run typecheck` again – the output will be silent, indicating **zero type errors**.

---

## Sample Output
```
=== IT313 Enrollment Eligibility Report (TypeScript) ===
Ana Cruz - Average: 87.67 - PASSING
Bea Santos - Average: 65.00 - PROBATION - Needs consultation
Cid Ramos - Average: 94.67 - PASSING
Dex Alonzo - Average: 55.00 - PROBATION - Needs consultation
Eli Tan - Average: 78.00 - PASSING
Class Average: 76.07
Passing: 3 / 5
Batch identifier is a string: B2024   # (output varies due to random selection)
```

---

## Author
- **Student:** Danica Almonia
- **Course:** IT 313 – Mobile Programming
- **Laboratory:** Lab 3 – TypeScript Foundations for React Native
- **GitHub Repository:** https://github.com/Danica-1011/IT313_Almonia_Danica_TypeScriptFoundations

---

*End of README*
