import "./NewAreaForm.scss";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { publish } from "../../pubsub";
import CloseButton from "../CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";

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

    if (!name.trim() || typeof name !== "string") {
      formErrors.name = "Name is required and must be a valid string.";
    }

    const weekdayRateNum = Number(weekdayRate);
    const weekendRateNum = Number(weekendRate);

    if (!weekdayRate.trim() || isNaN(weekdayRateNum) || weekdayRateNum <= 0) {
      formErrors.weekdayRate =
        "Please enter a valid weekday rate (must be a number greater than 0).";
    }

    if (!weekendRate.trim() || isNaN(weekendRateNum) || weekendRateNum <= 0) {
      formErrors.weekendRate =
        "Please enter a valid weekend rate (must be a number greater than 0).";
    }

    if (discount && (isNaN(Number(discount)) || Number(discount) < 0)) {
      formErrors.discount =
        "Discount must be a number greater than or equal to 0 if provided.";
    }

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
      publish("parkingAreaCreated", formData);
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToForm();
  });

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
