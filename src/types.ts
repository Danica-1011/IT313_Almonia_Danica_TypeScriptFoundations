// src/types.ts

/**
 * Types and enums used across the Enrollment Eligibility Checker.
 */

export enum EnrollmentStatus {
  Passing = "PASSING",
  Probation = "PROBATION",
}

export interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

export type EligibilityReport = {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string; // only for probation
};
