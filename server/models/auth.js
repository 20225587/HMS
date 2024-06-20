const db = require("../db");
const bcrypt = require("bcryptjs");

const User = {
  create: async (email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
      db.query(query, [email, hashedPassword, role], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email = ?";
      db.query(query, [email], (err, result) => {
        if (err) reject(err);
        resolve(result[0]);
      });
    });
  },
};

module.exports = User;
