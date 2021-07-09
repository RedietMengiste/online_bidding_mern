const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "defaultAuction.png",
    },
    bidStart: {
      type: Date,
      default: Date.now,
    },
    bidEnd: {
      type: Date,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    startingBid: { type: Number, default: 0 },
    bids: [
      {
        bidder: { type: mongoose.Schema.ObjectId, ref: "User" },
        bid: Number,
        time: Date,
      },
    ],
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Auction = mongoose.model("Auction", schema);
module.exports = Auction;
