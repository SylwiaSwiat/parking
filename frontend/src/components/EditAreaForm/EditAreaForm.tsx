import "./EditAreaForm.scss";
import { useState } from "react";
import { ParkingAreaType } from "../ParkingAreasList/ParkingAreasList";

type EditAreaFormProps = {
  currentData: ParkingAreaType;
  onSave: (updatedData: ParkingAreaType) => void;
  onCancel: () => void;
};

const EditAreaForm = ({ currentData, onSave, onCancel }: EditAreaFormProps) => {
  const [name, setName] = useState(currentData.name);
  const [weekdayRate, setWeekdayRate] = useState(currentData.weekdayRate);
  const [weekendRate, setWeekendRate] = useState(currentData.weekendRate);
  const [discount, setDiscount] = useState(currentData.discount || 0);

  const handleSave = () => {
    onSave({
      ...currentData,
      name,
      weekdayRate,
      weekendRate,
      discount,
    });
  };

  return (
    <div className="editForm">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={weekdayRate}
        onChange={(e) => setWeekdayRate(Number(e.target.value))}
        placeholder="Weekday Rate"
        min="1"
      />
      <input
        type="number"
        value={weekendRate}
        onChange={(e) => setWeekendRate(Number(e.target.value))}
        placeholder="Weekend Rate"
        min="1"
      />
      <input
        type="number"
        value={discount || ""}
        onChange={(e) => setDiscount(Number(e.target.value))}
        placeholder="Discount"
        min="0"
        max="100"
      />
      <div className="buttonContainer">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditAreaForm;
