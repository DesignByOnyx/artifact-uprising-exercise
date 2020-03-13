import React from "react";
import { ICartItem, IQuantityChangedEvent, ButtonClick } from "./types";
import CartItem from "./CartItem";
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

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>

      {cartItems.length ? (
        <CartItems
          cartItems={cartItems}
          onItemQuantityChanged={handleItemQuantityChanged}
        />
      ) : (
        <EmptyCart />
      )}

      <button onClick={handleAddButtonClick}>Add Item to Cart</button>
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
