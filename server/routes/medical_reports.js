// routes/medical_reports.js

const express = require("express");
const router = express.Router();
const MedicalReport = require("../models/medical_report");

// Get all medical reports
router.get("/", async (req, res) => {
  try {
    const reports = await MedicalReport.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get medical reports by patient ID
router.get("/patient/:patientId", async (req, res) => {
  const patientId = req.params.patientId;
  try {
    const reports = await MedicalReport.findByPatientId(patientId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new medical report
router.post("/", async (req, res) => {
  const newReport = req.body;
  try {
    const reportId = await MedicalReport.create(newReport);
    res.status(201).json({ id: reportId, ...newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update medical report by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedReport = req.body;
  try {
    const result = await MedicalReport.update(id, updatedReport);
    if (result === 0) {
      res.status(404).json({ message: "Medical report not found" });
      return;
    }
    res.json({ message: "Medical report updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete medical report by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await MedicalReport.delete(id);
    if (result === 0) {
      res.status(404).json({ message: "Medical report not found" });
      return;
    }
    res.json({ message: "Medical report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
