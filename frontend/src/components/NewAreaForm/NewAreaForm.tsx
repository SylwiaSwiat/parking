import "./NewAreaForm.scss";
import axios from "axios";
import { useState, useRef } from "react";
import CloseButton from "../CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";
import { validateDiscount, validateName, validateWeekDay, validateWeekend } from "../../helpers/validateForm";

const NewAreaForm = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    weekdayRate: "",
    weekendRate: "",
    discount: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    weekdayRate: "",
    weekendRate: "",
    discount: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formErrors = {
      name: "",
      weekdayRate: "",
      weekendRate: "",
      discount: "",
    };

    const { name, weekdayRate, weekendRate, discount } = formData;

    formErrors.name = validateName(name);
    formErrors.weekdayRate = validateWeekDay(weekdayRate)
    formErrors.weekendRate = validateWeekend(weekendRate);
    formErrors.discount = validateDiscount(discount);

    if (
      formErrors.name ||
      formErrors.weekdayRate ||
      formErrors.weekendRate ||
      formErrors.discount
    ) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post("/api/parking-areas", formData);
      console.log("Parking area added:", response.data);
      setSuccessMessage("Park area created!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error adding parking area:", error);
    }
  };

  return (
    <div ref={formRef} className="newAreaForm">
      <CloseButton />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          Weekday Rate:
          <input
            type="number"
            name="weekdayRate"
            value={formData.weekdayRate}
            onChange={handleChange}
            required
          />
          {errors.weekdayRate && <p className="error">{errors.weekdayRate}</p>}
        </label>
        <label>
          Weekend Rate:
          <input
            type="number"
            name="weekendRate"
            value={formData.weekendRate}
            onChange={handleChange}
            required
          />
          {errors.weekendRate && <p className="error">{errors.weekendRate}</p>}
        </label>
        <label>
          Discount (%):
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
          {errors.discount && <p className="error">{errors.discount}</p>}
        </label>
        <button type="submit" className="submitButton">
          Add Parking Area
        </button>
        {successMessage && <p className="successMessage">{successMessage}</p>}{" "}
      </form>
    </div>
  );
};

export default NewAreaForm;
