import mongoose from "mongoose";
// Define the schema for the cart/order data
const lineItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  properties: { type: mongoose.Schema.Types.Mixed, default: null },
  quantity: { type: Number, required: true },
  variant_id: { type: Number, required: true },
  key: { type: String, required: true },
  discounted_price: { type: String, required: true },
  line_price: { type: String, required: true },
  original_line_price: { type: String, required: true },
  original_price: { type: String, required: true },
  price: { type: String, required: true },
  product_id: { type: Number, required: true },
  title: { type: String, required: true },
  vendor: { type: String, required: true },
  taxable: { type: Boolean, required: true },
  total_discount: { type: String, required: true },
  discounted_price_set: { type: mongoose.Schema.Types.Mixed, required: true },
  line_price_set: { type: mongoose.Schema.Types.Mixed, required: true },
  original_line_price_set: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  price_set: { type: mongoose.Schema.Types.Mixed, required: true },
  total_discount_set: { type: mongoose.Schema.Types.Mixed, required: true },
});

const cartSchema = new mongoose.Schema({
  id: { type: String, required: true },
  token: { type: String, required: true },
  line_items: [lineItemSchema], // Array of line items
  note: { type: String, default: "" },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default cartSchema;
