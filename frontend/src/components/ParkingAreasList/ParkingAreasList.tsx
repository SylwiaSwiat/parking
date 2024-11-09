import "./ParkingAreasList.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import ParkingArea from "../ParkingArea/ParkingArea";
import CreateNewAreaButton from "../CreateNewAreaButton/CreateNewAreaButton";
import CalculateButton from "../CalculateButton/CalculateButton";

export interface ParkingAreaType {
  id: string;
  name: string;
  weekdayRate: number;
  weekendRate: number;
  discount: number;
}

const ParkingAreasList = () => {
  const [parkingAreas, setParkingAreas] = useState<ParkingAreaType[]>([]);

  useEffect(() => {
    axios.get("/api/parking-areas").then((res) => {
      setParkingAreas(res.data);
    });
  }, []);

  return (
    <div className="parkingAreasListContainer">
      <h1>Parking Areas</h1>
      <div className="parkingAreasList">
        {parkingAreas.length > 0 &&
          parkingAreas.map((el) => (
            <ParkingArea
              key={el.id}
              id={el.id}
              name={el.name}
              weekdayRate={el.weekdayRate}
              weekendRate={el.weekendRate}
              discount={el.discount}
              setParkingAreas={setParkingAreas}
            />
          ))}
      </div>
      <CreateNewAreaButton />
      <CalculateButton />
    </div>
  );
};

export default ParkingAreasList;
