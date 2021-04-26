import classNames from "classnames";
import Button from "components/@shared/button/Button.component";
import Modal from "components/@shared/modal/Modal.component";
import Tooltip from "components/@shared/tooltip/Tooltip.component";
import useKeyPress from "hooks/useKeyPress";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Player } from "types/Player";
import "./Map.scss";
import {
  MAP_CENTER,
  MAP_COLUMN_SIZE,
  MAP_LINE_SIZE,
  MAP_POSITIONS,
  isEqualCoord,
  COORDINATES,
  hasWallToThe,
  MapCoordinate,
  getCoordinate,
  MapCoordinateElementType,
  MapCoordinateElement,
  getUniqueElements,
} from "./Map.utils";

export interface MapProps {
  label: string;
  player: Player;
  onPlayerMove?: (newPosition: MapCoordinate) => void;
}

export const ElementsDetails: React.FC<{
  elements: MapCoordinateElement[];
  player?: Player;
  light?: boolean;
}> = ({ elements, player, light = true }) => {
  const [encounterOpen, setEncounterModal] = useState(false);
  const elementsWithQtd = useMemo(() => {
    const uniqueElements = getUniqueElements(elements);
    return player
      ? [{ ...player, quantity: 1 }, ...uniqueElements]
      : uniqueElements;
  }, [elements, player]);

  return (
    <div className="MapElementsDetails">
      {elementsWithQtd.map((element, index) => (
        <div className="MapElementsDetails" key={index}>
          <div className="MapElementsDetails-name">
            <span>
              <b>
                {element.name}({element.label})
              </b>
            </span>
          </div>
          <p>
            <b>Descrição: </b> {element.description}
          </p>
          {element.quantity > 1 && (
            <p>
              <b>Quantidade: </b> {element.quantity}
            </p>
          )}
          {(element as MapCoordinateElement).actionQuote && (
            <Button
              light={light}
              onClick={() => setEncounterModal(!encounterOpen)}
            >
              {(element as MapCoordinateElement).actionQuote}
            </Button>
          )}
        </div>
      ))}
      {encounterOpen && <Modal>Modal</Modal>}
    </div>
  );
};

const Map: React.FC<MapProps> = ({ label, player, onPlayerMove }) => {
  const [playerPosition, setPlayerPosition] = useState(MAP_CENTER);
  const [moveTimeout, setMoveTimeout] = useState<number>(-1);
  const [movingDirection, setMovingDirection] = useState<string>();

  const arrowUp: boolean = useKeyPress("ArrowUp");
  const arrowDown: boolean = useKeyPress("ArrowDown");
  const arrowLeft: boolean = useKeyPress("ArrowLeft");
  const arrowRight: boolean = useKeyPress("ArrowRight");

  useEffect(() => {
    onPlayerMove?.(playerPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerPosition.x, playerPosition.y]);

  const move = useCallback(
    (direction) => {
      setPlayerPosition((playerPosition) => {
        let x = playerPosition.x;
        let y = playerPosition.y;
        if (
          arrowUp &&
          playerPosition.y > 0 &&
          !hasWallToThe("top", playerPosition)
        ) {
          y--;
        }
        if (
          arrowDown &&
          playerPosition.y < MAP_COLUMN_SIZE - 1 &&
          !hasWallToThe("bottom", playerPosition)
        ) {
          y++;
        }
        if (
          arrowLeft &&
          playerPosition.x > 0 &&
          !hasWallToThe("left", playerPosition)
        ) {
          x--;
        }
        if (
          arrowRight &&
          playerPosition.x < MAP_LINE_SIZE - 1 &&
          !hasWallToThe("right", playerPosition)
        ) {
          x++;
        }
        const coordinate = getCoordinate(x, y) as MapCoordinate;

        return coordinate;
      });

      setMovingDirection(direction);
      setMoveTimeout(
        (setTimeout(() => {
          move(direction);
        }, 150) as unknown) as number
      );
    },
    [arrowUp, arrowDown, arrowLeft, arrowRight]
  );

  const stop = useCallback(() => {
    clearTimeout(moveTimeout);
    setMoveTimeout(-1);
    setMovingDirection(undefined);
  }, [moveTimeout]);

  useEffect(() => {
    if (moveTimeout === -1) {
      if (arrowUp) {
        move("Up");
      }
      if (arrowDown) {
        move("Down");
      }
      if (arrowLeft) {
        move("Left");
      }
      if (arrowRight) {
        move("Right");
      }
    } else {
      if (
        (!arrowUp && movingDirection === "Up") ||
        (!arrowDown && movingDirection === "Down") ||
        (!arrowLeft && movingDirection === "Left") ||
        (!arrowRight && movingDirection === "Right")
      ) {
        stop();
      }
    }
  }, [
    arrowUp,
    arrowDown,
    arrowLeft,
    arrowRight,
    movingDirection,
    moveTimeout,
    move,
    stop,
  ]);

  const renderElements = useCallback(
    (coord: MapCoordinate) => {
      const elementSymbolMap = {
        [MapCoordinateElementType.ENEMY]: "!",
        [MapCoordinateElementType.NPC]: "*",
      };
      const getUniqueElementsType = (elements: MapCoordinateElement[]) => {
        const types: MapCoordinateElementType[] = [];
        const unique: MapCoordinateElement[] = [];
        elements.forEach((el) => {
          if (!types.includes(el.type)) {
            types.push(el.type);
            unique.push(el);
          }
        });
        return unique;
      };
      return (
        <span
          className={classNames({
            "Map-position--withElement": coord.elements.length > 0,
          })}
        >
          <Tooltip
            position="bottom"
            content={
              <ElementsDetails
                elements={coord.elements}
                player={
                  isEqualCoord(coord, playerPosition) ? player : undefined
                }
              />
            }
          >
            {isEqualCoord(coord, playerPosition) && "@"}
            {getUniqueElementsType(coord.elements).map(
              (element) => elementSymbolMap[element.type]
            )}
          </Tooltip>
        </span>
      );
    },
    [player, playerPosition]
  );

  return (
    <div className="Map">
      <span className="Map-label">{label}</span>
      {MAP_POSITIONS.map((key) => (
        <div
          key={key}
          className={classNames("Map-position", {
            "Map-position--visible": isEqualCoord(
              COORDINATES[key],
              playerPosition
            ),
            "Map-position--halfVisible": isEqualCoord(
              COORDINATES[key],
              playerPosition,
              1
            ),
            "Map-position--thirdVisible": isEqualCoord(
              COORDINATES[key],
              playerPosition,
              2
            ),
            "Map-wall": COORDINATES[key].isWall,
            "Map-wall--left": hasWallToThe("left", COORDINATES[key]),
            "Map-wall--right": hasWallToThe("right", COORDINATES[key]),
            "Map-wall--top": hasWallToThe("top", COORDINATES[key]),
            "Map-wall--bottom": hasWallToThe("bottom", COORDINATES[key]),
          })}
        >
          {renderElements(COORDINATES[key])}
        </div>
      ))}
    </div>
  );
};

export default Map;
