import React from "react";
import {
  ICartItem,
  InputEvent,
  ButtonClick,
  IQuantityChangedDetail,
  IItemRemovedDetail
} from "./types";
import { emitEvent } from "../utils";
import "./CartItem.css";

interface CartItemProps {
  cartItem: ICartItem;
}

function CartItem({ cartItem }: CartItemProps) {
  function handleQuantityChange(ev: InputEvent) {
    const target = ev.target as HTMLInputElement;

    emitEvent<IQuantityChangedDetail>(target, "itemQuantityChanged", {
      sku: cartItem.sku,
      quantity: parseInt(target.value, 10)
    });
  }

  function handleRemoveClick(ev: ButtonClick) {
    const target = ev.target as HTMLInputElement;
    ev.preventDefault();

    emitEvent<IItemRemovedDetail>(target, "itemRemoved", {
      sku: cartItem.sku
    });
  }

  return (
    <div className="cart-item">
      <div className="details">
        <h3>{cartItem.name}</h3>
        <div className="sku">SKU: {cartItem.sku}</div>
      </div>
      <div className="actions">
        <input
          type="number"
          min="0"
          value={cartItem.quantity}
          onChange={handleQuantityChange}
        />
        <button onClick={handleRemoveClick}>x</button>
      </div>
    </div>
  );
}

export default CartItem;
