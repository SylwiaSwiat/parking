import "./EditAreaForm.scss";
import { useState } from "react";
import { ParkingAreaType } from "../ParkingAreasList/ParkingAreasList";
import {
  validateDiscount,
  validateName,
  validateWeekDay,
  validateWeekend,
} from "../../helpers/validateForm";

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
  const [errors, setErrors] = useState({
    name: "",
    weekdayRate: "",
    weekendRate: "",
    discount: "",
  });

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formErrors = {
      name: "",
      weekdayRate: "",
      weekendRate: "",
      discount: "",
    };

    formErrors.name = validateName(name);
    formErrors.weekdayRate = validateWeekDay(weekdayRate.toString());
    formErrors.weekendRate = validateWeekend(weekendRate.toString());
    formErrors.discount = validateDiscount(discount.toString());

    if (
      formErrors.name ||
      formErrors.weekdayRate ||
      formErrors.weekendRate ||
      formErrors.discount
    ) {
      setErrors(formErrors);
      return;
    }

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
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="number"
        value={weekdayRate}
        onChange={(e) => setWeekdayRate(Number(e.target.value))}
        placeholder="Weekday Rate"
        min="1"
      />
      {errors.weekdayRate && <p className="error">{errors.weekdayRate}</p>}
      <input
        type="number"
        value={weekendRate}
        onChange={(e) => setWeekendRate(Number(e.target.value))}
        placeholder="Weekend Rate"
        min="1"
      />
      {errors.weekendRate && <p className="error">{errors.weekendRate}</p>}
      <input
        type="number"
        value={discount || ""}
        onChange={(e) => setDiscount(Number(e.target.value))}
        placeholder="Discount"
        min="0"
        max="100"
      />
      {errors.discount && <p className="error">{errors.discount}</p>}
      <div className="buttonContainer">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditAreaForm;
