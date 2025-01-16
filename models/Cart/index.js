import mongoose from "mongoose";
import cartSchema from "./schema.js";

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
