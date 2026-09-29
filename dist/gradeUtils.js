"use strict";
// src/gradeUtils.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAverage = computeAverage;
exports.default = getStatus;
const types_1 = require("./types");
/**
 * Compute the average of three numeric grades.
 */
function computeAverage(prelim, midterm, final) {
    return (prelim + midterm + final) / 3;
}
/**
 * Determine the enrollment status based on average.
 */
function getStatus(average) {
    return average >= 75 ? types_1.EnrollmentStatus.Passing : types_1.EnrollmentStatus.Probation;
}
