"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const types_1 = require("./types");
const gradeUtils_1 = require("./gradeUtils");
const gradeUtils_2 = __importDefault(require("./gradeUtils"));
/** Simulated async fetch of enrollee data */
async function getEnrollees() {
    const enrollees = [
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
let batchId = Math.random() > 0.5 ? "B2023" : 2023;
function describeBatch(id) {
    if (typeof id === "string") {
        return `Batch identifier is a string: ${id}`;
    }
    return `Batch identifier is a number: ${id}`;
}
// Generic grouping function
function groupBy(items, keyFn) {
    return items.reduce((acc, item) => {
        const key = keyFn(item);
        (acc[key] ??= []).push(item);
        return acc;
    }, {});
}
/** Main async workflow */
async function runReport() {
    try {
        const enrollees = await getEnrollees();
        // Build an array of typed reports using map, computeAverage, and getStatus
        const reports = enrollees.map((e) => {
            const avg = (0, gradeUtils_1.computeAverage)(e.prelim, e.midterm, e.final);
            const status = (0, gradeUtils_2.default)(avg);
            const remarks = status === types_1.EnrollmentStatus.Probation ? "Needs consultation" : undefined;
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
        console.log(`Passing: ${grouped[types_1.EnrollmentStatus.Passing]?.length ?? 0} / ${reports.length}`);
        console.log(describeBatch(batchId));
    }
    catch (err) {
        console.error("Failed to fetch enrollee data:", err);
    }
}
runReport();
