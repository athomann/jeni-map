import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

type CustomPopupProps = {
  latitude: number;
  longitude: number;
  onClose: () => void;
  data: {
    [key: string]: any;
  };
};

const dataDictionary: { [key: string]: string } = {
  zip: "ZIP Code",
  jenicategory: "JENI Category",
  jenipctl: "JENI Percentile",
  jenirank: "JENI Rank",
  riskcategory: "Risk Category",
  riskpctl: "Risk Percentile",
  driverscategory: "Drivers Category",
  driverspctl: "Drivers Percentile",
  systemcategory: "System Category",
  systempctl: "System Percentile",
  neighborhood: "Neighborhood",
  sup_dist: "Supervisorial District",
  spa: "Service Planning Area",
  csa: "Community Service Area",
};

const DetailPanel: React.FC<CustomPopupProps> = ({
  latitude,
  longitude,
  onClose,
  data,
}) => {
  return (
    <div className="absolute top-0 left-2 mt-10 bg-white p-4 shadow-lg rounded-lg text-gray-800 w-96">
      <h3 className="font-bold mb-2">Details</h3>
      <button onClick={onClose} className="absolute top-0 right-0 m-2 text-lg">
        &times;
      </button>
      <div>
        {Object.entries(data)
          .filter(([key, value]) => {
            return Object.keys(dataDictionary).includes(key);
          })
          .map(([key, value]) => (
            <div
              key={key}
              className="text-sm flex justify-between pb-2 border-b"
            >
              <div>{`${dataDictionary[key]}:`}</div> <div> {`${value}`}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailPanel;
