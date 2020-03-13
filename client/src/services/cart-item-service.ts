import { ICartItem } from "../components/types";
import { handleAPIResponse } from "../utils";

const CART_ITEMS_URL = "http://localhost:3030/cart-items";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

/**
 * Generates a new Cart Item with random name and SKU
 */
function makeNewCartItem(): ICartItem {
  const rnd = Math.random()
    .toString(32)
    .slice(2);

  return {
    name: "Product " + rnd.toUpperCase(),
    sku: rnd,
    quantity: 1
  };
}

const CartItemService = {
  async getList() {
    return await fetch(CART_ITEMS_URL, {
      headers
    }).then(handleAPIResponse);
  },

  async create() {
    return await fetch(CART_ITEMS_URL, {
      method: "post",
      body: JSON.stringify(makeNewCartItem()),
      headers
    }).then(handleAPIResponse);
  },

  async update(cartItem: ICartItem) {
    return await fetch(`${CART_ITEMS_URL}/${cartItem.id}`, {
      method: "put",
      body: JSON.stringify(cartItem),
      headers
    }).then(handleAPIResponse);
  },

  async remove(cartItem: ICartItem) {
    return await fetch(`${CART_ITEMS_URL}/${cartItem.id}`, {
      method: "delete",
      headers
    }).then(handleAPIResponse);
  }
};

export default CartItemService;
