// models/user.js

const db = require("../db");

const User = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (error, results) => {
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
      db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (results.length) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      });
    });
  },
  create: (newUser) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", newUser, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.insertId);
      });
    });
  },
  update: (id, user) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE users SET ? WHERE id = ?",
        [user, id],
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
      db.query("DELETE FROM users WHERE id = ?", [id], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results.affectedRows);
      });
    });
  },
};

module.exports = User;
