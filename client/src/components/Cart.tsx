import React from "react";
import { ICartItem, IQuantityChangedEvent, ButtonClick } from "./types";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import CartItemService from "../services/cart-item-service";
import {
  useLoadCartItems,
  useQuantityChangedHandler,
  useItemRemovedHandler
} from "./cart-hooks";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useLoadCartItems();
  const handleItemQuantityChanged = useQuantityChangedHandler(
    cartItems,
    setCartItems
  );
  useItemRemovedHandler(cartItems, setCartItems);

  function handleAddButtonClick(ev: ButtonClick) {
    ev.preventDefault();

    CartItemService.create().then(data => {
      setCartItems([...cartItems, data]);
    });
  }

  const className = "cart" + (cartItems.length ? " has-items" : "");

  return (
    <div className={className}>
      <h1>Shopping Cart</h1>

      {cartItems.length ? (
        <CartItems
          cartItems={cartItems}
          onItemQuantityChanged={handleItemQuantityChanged}
        />
      ) : (
        <EmptyCart />
      )}

      <button className="add-new-item" onClick={handleAddButtonClick}>
        Add Item to Cart
      </button>

      <CartTotals cartItems={cartItems} />
    </div>
  );
}

interface CartItemsProps {
  cartItems: ICartItem[];
  onItemQuantityChanged: (ev: IQuantityChangedEvent) => void;
}

function CartItems({ cartItems }: CartItemsProps) {
  return (
    <ul>
      {cartItems.map(item => (
        <li key={item.sku}>
          <CartItem cartItem={item} />
        </li>
      ))}
    </ul>
  );
}

function EmptyCart() {
  return (
    <div className="empty-cart">
      There are no items in your cart. To add items, click the button below:{" "}
    </div>
  );
}

export default Cart;
