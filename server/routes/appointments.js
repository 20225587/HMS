// routes/appointments.js

const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

// Get all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointments by status (pending, approved, cancelled)
router.get("/status/:status", async (req, res) => {
  const status = req.params.status;
  try {
    const appointments = await Appointment.findByStatus(status);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointment by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new appointment
router.post("/", async (req, res) => {
  const newAppointment = req.body;
  try {
    const appointmentId = await Appointment.create(newAppointment);
    res.status(201).json({ id: appointmentId, ...newAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedAppointment = req.body;
  try {
    const result = await Appointment.update(id, updatedAppointment);
    if (result === 0) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json({ message: "Appointment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete appointment by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Appointment.delete(id);
    if (result === 0) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
