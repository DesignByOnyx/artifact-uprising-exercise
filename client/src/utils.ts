import { ICartItem } from "./components/types";

/**
 * Emits a custom event on a DOM element.
 *
 * @param element - the element used to dispatch the event
 * @param eventName - the name of the event
 * @param detail - the event details
 */
function emitEvent<T>(element: HTMLElement, eventName: string, detail: T) {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail
  });

  element.dispatchEvent(event);
}

/**
 * Normalizes API responses and throws on non-ok responses.
 */
function handleAPIResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

/**
 * Calculates the price * quantity for a single cart item.
 * @param item
 */
function calculateItemTotal(item: ICartItem) {
  return item.quantity * item.price;
}

/**
 * Calculates the grand total for a list of cart items.
 * @param cartItems
 */
function calculateGrandTotal(cartItems: ICartItem[]) {
  return cartItems.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);
}

/**
 * Formats a number as a "price" with dollar sign and two decimal places.
 * @param num
 */
function formatPrice(num: number) {
  return "$" + num.toFixed(2);
}

export {
  emitEvent,
  handleAPIResponse,
  calculateItemTotal,
  calculateGrandTotal,
  formatPrice
};
