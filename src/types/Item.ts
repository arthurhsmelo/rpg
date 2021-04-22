export interface Item {
  name: string;
  label: string;
  description: string;
  modifier?: string;
}

export interface ItemWithQty extends Item {
  quantity: number;
}
