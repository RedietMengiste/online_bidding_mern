const Auction = require("../models/auction");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/auctions"));
  },
  filename: function (req, file, cb) {
    cb(null, `product-${Date.now()}-image${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("image");

exports.createAuction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const auction = await Auction.create({
      ...req.body,
      image: req.file.filename,
      seller: req.user._id,
    });

    res.status(200).json({
      status: "success",
      auction,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAuctionById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const auction = await Auction.findById(req.params.auctionId)
      .populate("seller", "_id firstName lastName email")
      .populate("bids.bidder", "_id firstName lastName email phonenumber")
      .exec();

    if (!auction) {
      res.status(404).json({
        status: "error",
        message: "Auction with this ID does not exist",
      });
    }

    req.auction = auction;

    res.status(200).json({
      status: "success",
      auction,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateAuction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }

    const auction = await Auction.findByIdAndUpdate(
      req.params.auctionId,
      req.body,
      {
        new: true,
        populate: "seller",
      }
    );

    if (!auction) {
      res.status(404).json({
        status: "error",
        message: "Auction with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      auction,
    });
  } catch (error) {}
};

exports.deleteAuction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const auction = await Auction.findByIdAndDelete(req.params.auctionId);
    if (!auction) {
      res.status(404).json({
        status: "error",
        message: "Auction with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      auction: null,
    });
  } catch (error) {}
};

exports.getAllAuctions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Auction.paginate(
      {

      },
      {
        populate:"seller bids.bidder",
        page,
        limit,
        sort: "-createdAt",
      }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {}
};

exports.getOpenAuctions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Auction.paginate(
      {
        bidEnd: { $gt: new Date() },
      },
      {
        page,
        limit,
        sort: "bidStart",
      }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {}
};

exports.getAuctionsBySellerId = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Auction.paginate(
      {
        seller: req.user._id,
      },
      {populate:"seller bids.bidder",
        page,
        limit,
        sort: "bidStart",
      }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {}
};

exports.getAuctionsByBidderId = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const result = await Auction.paginate(
      {
        "bids.bidder": req.user._id,
      },
      {
        page,
        limit,
        sort: "bidStart",
      }
    );

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.isSeller = async (req, res, next) => {
  //   const isSeller = req.user && req.user.seller;
  const auction = await Auction.findById(req.params.auctionId)
    .populate("seller", "_id firstName lastName email")
    .populate("bids.bidder", "_id firstName lastName email phonenumber")
    .exec();

  if (!auction) {
    return res.status(404).json({
      status: "error",
      message: "Auction with this ID does not exist",
    });
  }
  const isSeller = req.user._id && auction.seller._id;
  if (!isSeller) {
    return res.status("403").json({
      error: "User is not a authorized",
    });
  }
  next();
};
