const express = require("express");
const router = express.Router();
const store = require("../db");
const getExchangeRate = require("../helpers/getExchangeRate");

router.post("/calculate-payment", async (req, res) => {
  console.log("Received request body:", req.body);

  const { parkingAreaId, startTime, endTime, currency = "EUR" } = req.body;

  const session = store.openSession();

  try {
    const parkingArea = await session.load(parkingAreaId);
    if (!parkingArea) {
      return res.status(404).json({ error: "Parking area not found" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    const timezoneOffset = start.getTimezoneOffset() * 60 * 1000;
    let weekdayHours = 0;
    let weekendHours = 0;
    for (
      let i = +start + timezoneOffset, j = +end + timezoneOffset;
      i < j;
      i = i + 60 * 60 * 1000
    ) {
      const date = new Date(i);
      if ([0, 6].includes(date.getDay())) {
        weekendHours += 1;
      } else {
        weekdayHours += 1;
      }
    }

    let totalAmount =
      weekdayHours * parkingArea.weekdayRate +
      weekendHours * parkingArea.weekendRate;

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
