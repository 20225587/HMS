// models/appointment.js

const db = require("../db");

const Appointment = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM appointments", (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  },
  findByStatus: (status) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM appointments WHERE status = ?",
        [status],
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
  create: (newAppointment) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO appointments SET ?",
        newAppointment,
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
  update: (id, appointment) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE appointments SET ? WHERE id = ?",
        [appointment, id],
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
        "DELETE FROM appointments WHERE id = ?",
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

module.exports = Appointment;
