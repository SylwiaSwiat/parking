const express = require("express");
const parkingRoutes = require("./routes/ParkingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use("/api", parkingRoutes);
app.use("/api", paymentRoutes);

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
