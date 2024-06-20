// models/hospital_analytics.js

const db = require("../db");

const HospitalAnalytics = {
  getEmployeeStatus: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM employees", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        // Calculate employees on work and off work based on status or other criteria
        // Example calculation:
        const employeesOnWork = results.filter(
          (employee) => employee.status === "on_work"
        );
        const employeesOffWork = results.filter(
          (employee) => employee.status === "off_work"
        );
        const analytics = {
          employeesOnWork: employeesOnWork.length,
          employeesOffWork: employeesOffWork.length,
          totalEmployees: results.length,
        };
        resolve(analytics);
      });
    });
  },
  getDiseaseDiagnoses: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM disease_diagnoses", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        // Analyze disease diagnoses data and provide analytics
        // Example: Count occurrences of each disease
        const diseaseCounts = results.reduce((acc, diagnosis) => {
          if (acc[diagnosis.disease]) {
            acc[diagnosis.disease]++;
          } else {
            acc[diagnosis.disease] = 1;
          }
          return acc;
        }, {});
        resolve(diseaseCounts);
      });
    });
  },
};

module.exports = HospitalAnalytics;
