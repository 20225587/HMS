// models/medical_report.js

const db = require("../db");

const MedicalReport = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM medical_reports", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  findByPatientId: (patientId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM medical_reports WHERE patient_id = ?",
        [patientId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  },
  create: (newReport) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO medical_reports SET ?",
        newReport,
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results.insertId);
        }
      );
    });
  },
  update: (id, report) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE medical_reports SET ? WHERE id = ?",
        [report, id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results.affectedRows);
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM medical_reports WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results.affectedRows);
        }
      );
    });
  },
};

module.exports = MedicalReport;
