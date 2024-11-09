import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParkingAreas from "./components/ParkingAreasList/ParkingAreasList";
import PaymentCalculator from "./components/PaymentCalculator/PaymentCalculator";
import NewAreaForm from "./components/NewAreaForm/NewAreaForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParkingAreas />} />
        <Route path="/create-new-area" element={<NewAreaForm />} />
        <Route path="/calculate-payment" element={<PaymentCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
