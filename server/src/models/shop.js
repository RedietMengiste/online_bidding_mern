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
      default: "defaultShop.png",
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Shop = mongoose.model("Shop", schema);

module.exports = Shop;
