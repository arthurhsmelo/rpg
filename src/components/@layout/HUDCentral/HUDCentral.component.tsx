import Map from "components/map/Map.component";
import React from "react";
import "./HUDCentral.scss";

const HUDCentral: React.FC = () => {
  return (
    <div className="HUDCentral">
      <div className="HUDCentral-map">
        <Map
          label="Mapa"
          player={{ name: "sorTuzin", label: "sT", description: "Você" }}
        />
      </div>
    </div>
  );
};

export default HUDCentral;
