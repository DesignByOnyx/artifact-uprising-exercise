export interface ICartItem {
  id?: number;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface IQuantityChangedDetail {
  sku: string;
  quantity: number;
}

export interface IQuantityChangedEvent
  extends CustomEvent<IQuantityChangedDetail> {}

export interface IItemRemovedDetail {
  sku: string;
}

export interface IItemRemovedEvent extends CustomEvent<IItemRemovedDetail> {}

export type ButtonClick = React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type InputEvent = React.FormEvent<HTMLInputElement>;
