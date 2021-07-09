const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "defaultProduct.png",
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    shop: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = mongoose.Schema('Product', schema);

module.exports = Product;