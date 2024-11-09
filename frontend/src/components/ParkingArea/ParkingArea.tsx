import "./ParkingArea.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faMinus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ParkingAreaType } from "../ParkingAreasList/ParkingAreasList";
import EditParkingAreaForm from "../EditAreaForm/EditAreaForm";

type ParkingAreaProps = {
  name: string;
  id: string;
  weekdayRate: number;
  weekendRate: number;
  discount?: number;
  setParkingAreas: React.Dispatch<React.SetStateAction<ParkingAreaType[]>>;
};

const ParkingArea = ({
  name,
  id,
  weekdayRate,
  weekendRate,
  discount,
  setParkingAreas,
}: ParkingAreaProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleParkingAreaDelete = () => {
    axios
      .delete(`/api/parking-areas/${encodeURIComponent(id)}`)
      .then(() => {
        setParkingAreas((prev) => prev.filter((area) => area.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting parking area:", error.response?.data);
      });
  };

  const handleParkingAreaSave = (updatedData: ParkingAreaType) => {
    axios
      .put(`/api/parking-areas/${encodeURIComponent(id)}`, updatedData)
      .then((res) => {
        console.log("Edit successful:", res.data);
        setParkingAreas((prev) =>
          prev.map((area) =>
            area.id === id ? { ...area, ...updatedData } : area
          )
        );
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error editing parking area:", error.response?.data);
      });
  };

  return (
    <div key={id} className="parkingAreaContainer">
      {isEditing ? (
        <EditParkingAreaForm
          currentData={{
            id,
            name,
            weekdayRate,
            weekendRate,
            discount: discount || 0,
          }}
          onSave={handleParkingAreaSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="header">
            <h2>{name}</h2>
            <div className="buttonsContainer">
              <button
                className="deleteButton"
                onClick={handleParkingAreaDelete}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <button className="editButton" onClick={() => setIsEditing(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
          <div className="wrapper">
            <p>Weekday rate: {weekdayRate}EUR</p>
            <p>Weekend rate: {weekendRate}EUR</p>
            {discount ? <p className="discount">Discount: {discount}%</p> : ""}
          </div>
        </>
      )}
    </div>
  );
};

export default ParkingArea;
