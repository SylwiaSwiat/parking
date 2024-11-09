import "./CloseButton.scss";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const CloseButton = () => {
  const navigate = useNavigate();
  return (
    <button className="closeButton" onClick={() => navigate("/")}>
      <FontAwesomeIcon icon={faClose} />
    </button>
  );
};

export default CloseButton;
