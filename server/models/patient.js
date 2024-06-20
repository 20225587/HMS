// models/patient.js

const db = require("../db");

const Patient = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM patients", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM patients WHERE id = ?",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length) {
            resolve(results[0]);
          } else {
            resolve(null);
          }
        }
      );
    });
  },
  create: (newPatient) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO patients SET ?", newPatient, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.insertId);
      });
    });
  },
  update: (id, patient) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE patients SET ? WHERE id = ?",
        [patient, id],
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
      db.query("DELETE FROM patients WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Patient;
