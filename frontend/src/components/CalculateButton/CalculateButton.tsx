import "./CalculateButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";

const CalculateButton = () => {
  return (
    <a href="/calculate-payment">
      <button className="calculateButton">
        <FontAwesomeIcon icon={faCreditCard} />
      </button>
    </a>
  );
};

export default CalculateButton;
