import Map, { ElementsDetails } from "components/map/Map.component";
import { getUniqueElements, MapCoordinate } from "components/map/Map.utils";
import React, { useCallback, useState } from "react";
import "./HUDCentral.scss";

const HUDCentral: React.FC = () => {
  const [timeline, setTimeline] = useState<string[]>([]);
  const [currentPosition, setCurrentPosition] = useState<MapCoordinate>();

  const onPlayerMove = useCallback((newPosition: MapCoordinate) => {
    setTimeline((t) => {
      const newTimeline = t;
      if (newPosition.elements.length > 0) {
        const uniqueElements = getUniqueElements(newPosition.elements);
        const elementsQuote = uniqueElements.map(
          (el) =>
            `${el.quantity} ${
              el.quantity > 1
                ? el.timelineQuote.plural
                : el.timelineQuote.singular
            }`
        );
        const quote = `Você vê ${
          elementsQuote.slice(0, -1).join(", ") +
          " e " +
          elementsQuote.slice(-1)
        }.`;
        return [quote, ...newTimeline];
      } else {
        return ["Nada aqui!", ...newTimeline];
      }
    });
    setCurrentPosition(newPosition);
  }, []);

  return (
    <div className="HUDCentral">
      <div className="HUDCentral-map">
        <Map
          label="Mapa"
          player={{ name: "sorTuzin", label: "sT", description: "Você" }}
          onPlayerMove={onPlayerMove}
        />
      </div>
      <div className="HUDCentral-events">
        <div className="HUDCentral-timeline">
          <div className="HUDCentral-timelineFade" />
          {timeline.map((quote, index) => (
            <p key={index}>{quote}</p>
          ))}
        </div>
        <div className="HUDCentral-availableActions">
          {currentPosition && currentPosition.elements.length > 0 && (
            <ElementsDetails
              elements={currentPosition.elements}
              light={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HUDCentral;
