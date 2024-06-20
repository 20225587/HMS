// routes/hospital_analytics.js

const express = require("express");
const router = express.Router();
const HospitalAnalytics = require("../models/hospital_analytics");

// Get hospital analytics
router.get("/", async (req, res) => {
  try {
    const employeeStatus = await HospitalAnalytics.getEmployeeStatus();
    const diseaseDiagnoses = await HospitalAnalytics.getDiseaseDiagnoses();
    const analytics = {
      employeeStatus,
      diseaseDiagnoses,
    };
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
