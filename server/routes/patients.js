// routes/patients.js

const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get patient by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new patient
router.post("/", async (req, res) => {
  const newPatient = req.body;
  try {
    const patientId = await Patient.create(newPatient);
    res.status(201).json({ id: patientId, ...newPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update patient by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedPatient = req.body;
  try {
    const result = await Patient.update(id, updatedPatient);
    if (result === 0) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.json({ message: "Patient updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete patient by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Patient.delete(id);
    if (result === 0) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
