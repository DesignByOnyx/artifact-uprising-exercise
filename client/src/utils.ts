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

function handleAPIResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export { emitEvent, handleAPIResponse };
