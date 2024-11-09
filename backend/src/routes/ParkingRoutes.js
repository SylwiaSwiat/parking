const express = require("express");
const router = express.Router();
const store = require("../db");
const ParkingArea = require("../models/ParkingArea");

router.post("/parking-areas", async (req, res) => {
  const { name, weekdayRate, weekendRate, discount } = req.body;

  const session = store.openSession();
  const parkingArea = new ParkingArea(name, weekdayRate, weekendRate, discount);

  try {
    await session.store(parkingArea);
    await session.saveChanges();
    res.status(201).json({ message: "Parking area created successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error creating parking area", details: error.message });
  }
});

router.put("/parking-areas/:id", async (req, res) => {
  const { id } = req.params;
  const { name, weekdayRate, weekendRate, discount } = req.body;
  const session = store.openSession();

  try {
    const parkingArea = await session.load(id);
    if (!parkingArea) {
      return res.status(404).json({ error: "Parking area not found" });
    }

    parkingArea.name = name ?? parkingArea.name;
    parkingArea.weekdayRate = weekdayRate ?? parkingArea.weekdayRate;
    parkingArea.weekendRate = weekendRate ?? parkingArea.weekendRate;
    parkingArea.discount = discount ?? parkingArea.discount;

    await session.saveChanges();
    res.status(200).json({ message: "Parking area updated successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating parking area", details: error.message });
  }
});

router.delete("/parking-areas/:id", async (req, res) => {
  const { id } = req.params;
  const session = store.openSession();

  try {
    const parkingArea = await session.load(id);
    if (!parkingArea) {
      return res.status(404).json({ error: "Parking area not found" });
    }

    session.delete(parkingArea);
    await session.saveChanges();
    res.status(200).json({ message: "Parking area deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting parking area", details: error.message });
  }
});

router.get("/parking-areas", async (req, res) => {
  const session = store.openSession();

  const parkingAreas = await session
    .query({ collection: "ParkingAreas" })
    .all();

  console.log("parkingAreas", parkingAreas);

  try {
    const parkingAreas = await session
      .query({ collection: "ParkingAreas" })
      .all();
    res.status(200).json(parkingAreas);
  } catch (error) {
    res.status(500).json({
      error: "Error retrieving parking areas",
      details: error.message,
    });
  }
});

module.exports = router;
