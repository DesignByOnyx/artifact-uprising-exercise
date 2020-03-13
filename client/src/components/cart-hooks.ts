import { useState, useEffect, useCallback } from "react";
import { ICartItem, IQuantityChangedEvent } from "./types";
import CartItemService from "../services/cart-item-service";

/**
 * This hook loads cart items from the server and updates the local cart items state.
 */
function useLoadCartItems() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    CartItemService.getList().then(paginated => setCartItems(paginated.data));
  }, []);

  return [cartItems, setCartItems] as const;
}

/**
 * This hook listens for quantity changed events, updates the data on the server, and
 * finally updates the local cart items state.
 *
 * @param cartItems
 * @param setCartItems
 */
function useQuantityChangedHandler(
  cartItems: ICartItem[],
  setCartItems: (cartItems: ICartItem[]) => void
) {
  const handleItemQuantityChanged = useCallback(
    (ev: IQuantityChangedEvent) => {
      const { sku, quantity } = ev.detail;
      const itemIndex = cartItems.findIndex(item => item.sku === sku);

      if (itemIndex === -1) {
        throw new Error(`Could not find item with SKU ${sku} in cart!`);
      }

      const updatedItem = { ...cartItems[itemIndex], quantity };

      CartItemService.update(updatedItem).then(data => {
        cartItems[itemIndex] = data;
        setCartItems([...cartItems]);
      });
    },
    [cartItems, setCartItems]
  );

  useEffect(() => {
    document.addEventListener(
      "itemQuantityChanged",
      handleItemQuantityChanged as EventListener
    );

    return () => {
      document.removeEventListener(
        "itemQuantityChanged",
        handleItemQuantityChanged as EventListener
      );
    };
  }, [handleItemQuantityChanged]);

  return handleItemQuantityChanged;
}

/**
 * This hook listens for quantity changed events, updates the data on the server, and
 * finally updates the local cart items state.
 *
 * @param cartItems
 * @param setCartItems
 */
function useItemRemovedHandler(
  cartItems: ICartItem[],
  setCartItems: (cartItems: ICartItem[]) => void
) {
  const handleItemRemoved = useCallback(
    (ev: IQuantityChangedEvent) => {
      const { sku } = ev.detail;
      const itemIndex = cartItems.findIndex(item => item.sku === sku);

      if (itemIndex === -1) {
        throw new Error(`Could not find item with SKU ${sku} in cart!`);
      }

      CartItemService.remove(cartItems[itemIndex]).then(() => {
        cartItems.splice(itemIndex, 1);
        setCartItems([...cartItems]);
      });
    },
    [cartItems, setCartItems]
  );

  useEffect(() => {
    document.addEventListener(
      "itemRemoved",
      handleItemRemoved as EventListener
    );

    return () => {
      document.removeEventListener(
        "itemRemoved",
        handleItemRemoved as EventListener
      );
    };
  }, [handleItemRemoved]);

  return handleItemRemoved;
}

export { useLoadCartItems, useQuantityChangedHandler, useItemRemovedHandler };
