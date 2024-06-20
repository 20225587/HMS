// models/doctor.js

const db = require("../db");

const Doctor = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM doctors", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  findByDepartment: (department) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM doctors WHERE department = ?",
        [department],
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
  create: (newDoctor) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO doctors SET ?", newDoctor, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.insertId);
      });
    });
  },
  update: (id, doctor) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE doctors SET ? WHERE id = ?",
        [doctor, id],
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
      db.query("DELETE FROM doctors WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = Doctor;
