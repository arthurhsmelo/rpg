import React, { useMemo } from "react";
import "./Bar.scss";

export interface BarProps {
  label: string;
  totalValue: number;
  currentValue: number;
}

const Bar: React.FC<BarProps> = ({ label, currentValue, totalValue }) => {
  const currentWidth = useMemo(() => (currentValue / totalValue) * 100 + "%", [
    currentValue,
    totalValue,
  ]);

  return (
    <div className="Bar">
      <div className="Bar-inner" style={{ width: currentWidth }} />
      <span className="Bar-label">{label}</span>
      <span className="Bar-currentValue">
        {currentValue}/{totalValue}
      </span>
    </div>
  );
};

export default Bar;
