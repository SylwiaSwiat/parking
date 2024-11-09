import "./CalculateButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";
import { useNavigate } from "react-router-dom";

const CalculateButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="calculateButton"
      onClick={() => navigate("/calculate-payment")}
    >
      <FontAwesomeIcon icon={faCreditCard} />
    </button>
  );
};

export default CalculateButton;
