const express = require("express");
const router = express.Router();
const store = require("../db");
const getExchangeRate = require("../helpers/getExchangeRate");

router.post("/calculate-payment", async (req, res) => {
  console.log("Received request body:", req.body);

  const {
    parkingAreaId,
    startTime,
    endTime,
    dayType,
    currency = "EUR",
  } = req.body;

  const session = store.openSession();
  try {
    const parkingArea = await session.load(parkingAreaId);
    if (!parkingArea) {
      return res.status(404).json({ error: "Parking area not found" });
    }

    const hourlyRate =
      dayType === "weekday" ? parkingArea.weekdayRate : parkingArea.weekendRate;

    const start = new Date(startTime);
    const end = new Date(endTime);
    const hoursParked = Math.ceil((end - start) / (1000 * 60 * 60));

    let totalAmount = hoursParked * hourlyRate;
    if (parkingArea.discount) {
      totalAmount *= (100 - parkingArea.discount) / 100;
    }

    if (currency !== "EUR") {
      try {
        const exchangeRate = await getExchangeRate(currency, endTime);
        console.log(`Exchange Rate for ${currency}:`, exchangeRate);
        totalAmount *= exchangeRate;
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        return res.status(500).json({
          error: "Error fetching exchange rate",
          details: error.message,
        });
      }
    }

    res.status(200).json({ amount: totalAmount.toFixed(2), currency });
  } catch (error) {
    console.error("Error calculating payment:", error);
    res
      .status(500)
      .json({ error: "Error calculating payment", details: error.message });
  }
});

module.exports = router;
