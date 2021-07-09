const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    shop: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

CartItemSchema.plugin(mongoosePaginate);
const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    customer_name: {
      type: String,
      trim: true,
    },
    customer_email: {
      type: String,
      trim: true,
    },
    delivery_address: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
