import { WithName } from "./Util";

export interface Item extends WithName {
  modifier?: string;
}

export interface ItemWithQty extends Item {
  quantity: number;
}
