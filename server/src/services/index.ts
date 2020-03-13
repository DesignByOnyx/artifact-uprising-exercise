import { Application } from "../declarations";
import cartItems from "./cart-items/cart-items.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function(app: Application) {
  app.configure(cartItems);
}
