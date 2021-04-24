import { WithName } from "types/Util";

export enum MapCoordinateElementType {
  ENEMY,
  NPC,
}
export interface Enemy extends WithName {
  type: MapCoordinateElementType.ENEMY;
}
export interface NPC extends WithName {
  type: MapCoordinateElementType.NPC;
}
export type MapCoordinateElement = Enemy | NPC;
export interface Coordinate {
  x: number;
  y: number;
}
export interface MapCoordinate extends Coordinate {
  isWall?: boolean;
  elements: MapCoordinateElement[];
}

export const MAP_PADDING_PX = 20;
export const MAP_WIDTH_PX = 565;
export const MAP_HEIGHT_PX = 672.5;
export const MAP_POSITION_PX = 25;
export const MAP_LINE_SIZE = Math.floor(
  (MAP_WIDTH_PX - MAP_PADDING_PX) / MAP_POSITION_PX
);
export const MAP_COLUMN_SIZE = Math.floor(
  (MAP_HEIGHT_PX - MAP_PADDING_PX) / MAP_POSITION_PX
);
export const MAP_MAX_POSITIONS = MAP_LINE_SIZE * MAP_COLUMN_SIZE;
export const MAP_POSITIONS = Array.from(Array(MAP_MAX_POSITIONS).keys());
export const COORDINATES: MapCoordinate[] = MAP_POSITIONS.map((index) => {
  const isWall =
    index === 0 ||
    index === 1 ||
    index === 21 ||
    index === 42 ||
    index === 300 ||
    index === 301 ||
    index === 302 ||
    index === 280 ||
    index === 259 ||
    index === 238 ||
    index === 217;
  const elements =
    index === 20
      ? [
          {
            name: "Arthur",
            label: "Ar",
            description: "Guarda da cidade",
            type: MapCoordinateElementType.NPC,
          },
          {
            name: "Javali",
            label: "Ja",
            description: "Animal selvagem",
            type: MapCoordinateElementType.ENEMY,
          },
          {
            name: "Javali",
            label: "Ja",
            description: "Animal selvagem",
            type: MapCoordinateElementType.ENEMY,
          },
        ]
      : [];
  return {
    x: index % MAP_LINE_SIZE,
    y: Math.floor(index / MAP_LINE_SIZE),
    isWall,
    elements,
  };
});
export const getCoordinate = (_x: number, _y: number) =>
  COORDINATES.find(({ x, y }) => x === _x && y === _y);
export const MAP_CENTER = getCoordinate(
  Math.floor(MAP_LINE_SIZE / 2),
  Math.floor(MAP_COLUMN_SIZE / 2)
) as MapCoordinate;
export const isEqualCoord = (
  coord1: MapCoordinate,
  coord2: MapCoordinate,
  offset: number = 0
) => {
  return (
    Math.abs(coord1.x - coord2.x) <= offset &&
    Math.abs(coord1.y - coord2.y) <= offset
  );
};
export const hasWallToThe = (direction: string, coord: MapCoordinate) => {
  const xOffset = direction === "left" ? -1 : direction === "right" ? 1 : 0;
  const yOffset = direction === "top" ? -1 : direction === "bottom" ? 1 : 0;
  const coordinate = getCoordinate(coord.x + xOffset, coord.y + yOffset);

  return coordinate?.isWall ?? false;
};
