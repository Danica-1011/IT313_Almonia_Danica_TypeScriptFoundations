// src/index.ts
import { Enrollee, EligibilityReport, EnrollmentStatus } from "./types";
import { computeAverage } from "./gradeUtils";
import getStatus from "./gradeUtils";

/** Simulated async fetch of enrollee data */
async function getEnrollees(): Promise<Enrollee[]> {
  const enrollees: Enrollee[] = [
    { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
    { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
    { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
    { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
    { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
  ];
  // Simulate a short network delay
  return new Promise((resolve) => setTimeout(() => resolve(enrollees), 500));
}

// Union‑type example – a batch identifier that could be a string or a number
let batchId: string | number = Math.random() > 0.5 ? "B2023" : 2023;

function describeBatch(id: string | number): string {
  if (typeof id === "string") {
    return `Batch identifier is a string: ${id}`;
  }
  return `Batch identifier is a number: ${id}`;
}

// Generic grouping function
function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/** Main async workflow */
async function runReport() {
  try {
    const enrollees = await getEnrollees();

    // Build an array of typed reports using map, computeAverage, and getStatus
    const reports: EligibilityReport[] = enrollees.map((e) => {
      const avg = computeAverage(e.prelim, e.midterm, e.final);
      const status = getStatus(avg);
      const remarks = status === EnrollmentStatus.Probation ? "Needs consultation" : undefined;
      return { name: e.name, average: avg, status, remarks };
    });

    // Group reports by status using the generic function
    const grouped = groupBy(reports, (r) => r.status);

    // Compute the class average with reduce
    const classAverage = reports
      .map((r) => r.average)
      .reduce((sum, a) => sum + a, 0) / reports.length;

    // Output the formatted report
    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");
    reports.forEach((r) => {
      const line = `${r.name} - Average: ${r.average.toFixed(2)} - ${r.status}` +
        (r.remarks ? ` - ${r.remarks}` : "");
      console.log(line);
    });
    console.log(`Class Average: ${classAverage.toFixed(2)}`);
    console.log(`Passing: ${grouped[EnrollmentStatus.Passing]?.length ?? 0} / ${reports.length}`);
    console.log(describeBatch(batchId));
  } catch (err) {
    console.error("Failed to fetch enrollee data:", err);
  }
}

runReport();
