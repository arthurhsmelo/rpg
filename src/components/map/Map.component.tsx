import classNames from "classnames";
import Tooltip from "components/@shared/tooltip/Tooltip.component";
import useKeyPress from "hooks/useKeyPress";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { Player } from "types/Player";
import { WithName } from "types/Util";
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
} from "./Map.utils";

export interface MapProps {
  label: string;
  player: Player;
}

const ElementsDetails: React.FC<{
  elements: MapCoordinateElement[];
  player?: Player;
}> = ({ elements, player }) => {
  const elementsWithQtd: (WithName & { quantity: number })[] = useMemo(() => {
    const elementsWithQtd = new Map();
    elements.forEach((el) => {
      let element = elementsWithQtd.get(el.name);
      let quantity = element?.quantity ?? 1;
      if (element) {
        quantity++;
      }
      element = { ...el, quantity };
      elementsWithQtd.set(el.name, { ...element, quantity });
    });
    const els = Array.from(elementsWithQtd.values());
    return player ? [{ ...player, quantity: 1 }, ...els] : els;
  }, [elements, player]);

  return (
    <div className="MapElementsDetails">
      {elementsWithQtd.map(({ name, label, description, quantity }, index) => (
        <div className="MapElementsDetails" key={index}>
          <div className="MapElementsDetails-name">
            <span>
              <b>
                {name}({label})
              </b>
            </span>
          </div>
          <p>
            <b>Descrição: </b> {description}
          </p>
          {quantity > 1 && (
            <p>
              <b>Quantidade: </b> {quantity}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

const _Map: React.FC<MapProps> = ({ label, player }) => {
  const [playerPosition, setPlayerPosition] = useState(MAP_CENTER);
  const [moveTimeout, setMoveTimeout] = useState<number>(-1);
  const [movingDirection, setMovingDirection] = useState<string>();

  const arrowUp: boolean = useKeyPress("ArrowUp");
  const arrowDown: boolean = useKeyPress("ArrowDown");
  const arrowLeft: boolean = useKeyPress("ArrowLeft");
  const arrowRight: boolean = useKeyPress("ArrowRight");

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

        return getCoordinate(x, y) as MapCoordinate;
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
      const zipElements = (elements: MapCoordinateElement[]) => {
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
            {zipElements(coord.elements).map(
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

export default _Map;
