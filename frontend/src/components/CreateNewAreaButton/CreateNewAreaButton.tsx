import "./CreateNewAreaButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const CreateNewAreaButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="circularButton"
      onClick={() => navigate("/create-new-area")}
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};

export default CreateNewAreaButton;
