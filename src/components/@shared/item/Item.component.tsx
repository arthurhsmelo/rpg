import React from "react";
import { ItemWithQty } from "types/Item";
import Tooltip from "../tooltip/Tooltip.component";
import "./Item.scss";

const ItemDetails: React.FC<ItemWithQty> = ({
  name,
  label,
  modifier,
  description,
}) => (
  <div className="ItemDetails">
    <div className="ItemDetails-name">
      <span>
        <b>
          {name}({label})
        </b>
      </span>
      <span>{modifier}</span>
    </div>
    <p>
      <b>Descrição: </b> {description}
    </p>
  </div>
);

const ItemCP: React.FC<ItemWithQty> = (props) => {
  const { label, modifier, quantity } = props;
  return (
    <Tooltip content={<ItemDetails {...props} />}>
      <div className="Item">
        <span className="Item-name">{label}</span>
        {modifier && <span className="Item-modifier">{modifier}</span>}
        {quantity > 1 && <span className="Item-quantity">x{quantity}</span>}
      </div>
    </Tooltip>
  );
};

export default ItemCP;
