import mongoose from "mongoose";
import orderSchema from "./schema.js";

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
