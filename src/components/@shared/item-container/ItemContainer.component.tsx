import React from "react";
import { ItemWithQty } from "types/Item";
import Item from "components/@shared/item/Item.component";
import { useMemo } from "react";
import "./ItemContainer.scss";

export interface ItemProps {
  label: string;
  numberOfSlots: number;
  items: Array<ItemWithQty>;
}

const ItemContainer: React.FC<ItemProps> = ({
  label,
  numberOfSlots,
  items,
}) => {
  const range = useMemo(() => Array.from(Array(numberOfSlots).keys()), [
    numberOfSlots,
  ]);

  return (
    <div className="ItemContainer">
      <span className="ItemContainer-label">{label}</span>
      {range.map((index) => (
        <div className="ItemContainer-item" key={index}>
          {index < items.length && <Item {...items[index]} />}
        </div>
      ))}
    </div>
  );
};

export default ItemContainer;
