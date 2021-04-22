import React from "react";
import HUDCentral from "components/layout/HUDCentral/HUDCentral.component";
import HUDLeft from "components/layout/HUDLeft/HUDLeft.component";
import HUDRight from "components/layout/HUDRight/HUDRight.component";
import "./HUD.scss";

const HUD: React.FC = () => {
  return (
    <div className="HUD">
      <div className="HUD-left">
        <HUDLeft />
      </div>
      <div className="HUD-central">
        <HUDCentral />
      </div>
      <div className="HUD-right">
        <HUDRight />
      </div>
    </div>
  );
};

export default HUD;
