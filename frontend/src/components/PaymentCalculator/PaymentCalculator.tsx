import "./PaymentCalculator.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseButton from "../CloseButton/CloseButton";

interface PaymentCalculatorType {
  id: string;
  name: string;
}

const PaymentCalculator = () => {
  const [parkingAreas, setParkingAreas] = useState<PaymentCalculatorType[]>([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayType, setDayType] = useState("weekday");
  const [currency, setCurrency] = useState("EUR");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetchParkingAreas = async () => {
      try {
        const response = await axios.get("/api/parking-areas");
        setParkingAreas(response.data);
      } catch (error) {
        console.error("Error fetching parking areas:", error);
      }
    };
    fetchParkingAreas();
  }, []);

  const handleCalculate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!selectedArea || !startDate || !startTime || !endDate || !endTime) {
      setError("Please fill in all fields.");
      return;
    }

    const formattedStartTime = new Date(`${startDate}T${startTime}:00Z`);
    const formattedEndTime = new Date(`${endDate}T${endTime}:00Z`);

    if (formattedEndTime <= formattedStartTime) {
      setError("End date and time must be later than the start date and time.");
      return;
    }

    if ([6, 0].includes(formattedEndTime.getDay())) {
      setDayType("weekend");
    }

    setError("");

    const paymentData = {
      parkingAreaId: selectedArea,
      startTime: formattedStartTime.toISOString(),
      endTime: formattedEndTime.toISOString(),
      dayType,
      currency,
    };

    try {
      const response = await axios.post("/api/calculate-payment", paymentData);
      setResult(`Total Amount: ${response.data.amount} ${currency}`);
    } catch (err) {
      setError("Error calculating payment.");
      console.error(err);
    }
  };

  return (
    <div className="paymentCalculator">
      <h2>Calculate Payment</h2>
      <CloseButton />
      <form onSubmit={handleCalculate}>
        <label>
          Parking Area:
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            required
          >
            <option value="">Select a parking area</option>
            {parkingAreas.length &&
              parkingAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
          </select>
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <label>
          Currency:
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="PLN">PLN</option>
          </select>
        </label>
        <button type="submit" className="submitButton">
          Calculate Amount
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      {result && <p>{result}</p>}
    </div>
  );
};

export default PaymentCalculator;
