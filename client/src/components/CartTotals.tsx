import React from "react";
import { ICartItem } from "./types";
import { calculateItemTotal, calculateGrandTotal, formatPrice } from "../utils";
import "./CartTotals.css";

interface CartTotalsProps {
  cartItems: ICartItem[];
}

function CartTotals({ cartItems }: CartTotalsProps) {
  if (cartItems && cartItems.length) {
    return (
      <aside className="cart-totals">
        <h2>Cart Totals</h2>
        {cartItems.map(item => (
          <div key={item.sku} className="cart-item">
            <span className="name">
              {item.quantity} x {item.name}
            </span>
            <b className="total">{formatPrice(calculateItemTotal(item))}</b>
          </div>
        ))}

        <div className="grand-total">
          {formatPrice(calculateGrandTotal(cartItems))}
        </div>
      </aside>
    );
  }
  return null;
}

export default CartTotals;
