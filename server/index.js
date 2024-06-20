const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Assuming db.js exports the MySQL connection
const userRoutes = require("./routes/users");
const appointmentRoutes = require("./routes/appointments");
const doctorRoutes = require("./routes/doctors");
const medicalReportRoutes = require("./routes/medical_reports");
const patientRoutes = require("./routes/patients");
const hospitalAnalyticsRoutes = require("./routes/hospital_analytics");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: "http://127.0.0.1:5500", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/medical-reports", medicalReportRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/hospital-analytics", hospitalAnalyticsRoutes);
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hospital Management System API" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// MySQL Connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
