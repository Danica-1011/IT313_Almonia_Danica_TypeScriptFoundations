// src/gradeUtils.ts

import { EnrollmentStatus } from "./types";

/**
 * Compute the average of three numeric grades.
 */
export function computeAverage(prelim: number, midterm: number, final: number): number {
  return (prelim + midterm + final) / 3;
}

/**
 * Determine the enrollment status based on average.
 */
export default function getStatus(average: number): EnrollmentStatus {
  return average >= 75 ? EnrollmentStatus.Passing : EnrollmentStatus.Probation;
}
