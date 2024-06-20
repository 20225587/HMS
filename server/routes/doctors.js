// routes/doctors.js

const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctors by department
router.get("/department/:department", async (req, res) => {
  const department = req.params.department;
  try {
    const doctors = await Doctor.findByDepartment(department);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new doctor
router.post("/", async (req, res) => {
  const newDoctor = req.body;
  try {
    const doctorId = await Doctor.create(newDoctor);
    res.status(201).json({ id: doctorId, ...newDoctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedDoctor = req.body;
  try {
    const result = await Doctor.update(id, updatedDoctor);
    if (result === 0) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.json({ message: "Doctor updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete doctor by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Doctor.delete(id);
    if (result === 0) {
      res.status(404).json({ message: "Doctor not found" });
      return;
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
