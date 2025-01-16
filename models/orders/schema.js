import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({
  id: { type: Schema.Types.String, required: true },
  properties: { type: Schema.Types.Mixed, default: null },
  quantity: { type: Number, required: true },
  variant_id: { type: Schema.Types.String, required: true },
  key: { type: Schema.Types.String, required: true },
  discounted_price: { type: String, required: true },
  discounts: { type: [Schema.Types.Mixed], default: [] },
  gift_card: { type: Boolean, default: false },
  grams: { type: Number, default: 0 },
  line_price: { type: String, required: true },
  original_line_price: { type: String, required: true },
  original_price: { type: String, required: true },
  price: { type: String, required: true },
  product_id: { type: Schema.Types.String, required: true },
  sku: { type: String, default: "" },
  taxable: { type: Boolean, required: true },
  title: { type: String, required: true },
  total_discount: { type: String, default: "0.00" },
  vendor: { type: String, required: true },
  discounted_price_set: { type: Schema.Types.Mixed, default: {} },
  line_price_set: { type: Schema.Types.Mixed, default: {} },
  original_line_price_set: { type: Schema.Types.Mixed, default: {} },
  price_set: { type: Schema.Types.Mixed, default: {} },
  total_discount_set: { type: Schema.Types.Mixed, default: {} },
});

const orderSchema = new Schema({
  id: { type: String, required: true },
  token: { type: String, required: true },
  line_items: [lineItemSchema],
  note: { type: String, default: "" },
  updated_at: { type: Date, required: true },
  created_at: { type: Date, required: true },
});

export default orderSchema;
