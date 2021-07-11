const express = require("express");
const { verifyUser } = require("../middleware/auth");
const auctionController = require("../controllers/auction");
const auctionValidation = require("../middleware/validation/auction");
const router = express.Router();

router.route("/any/allAuctions").get(auctionController.getAllAuctions);
router.route("/any/openAuctions").get(auctionController.getOpenAuctions);

router.route("/bid/:userId").get(verifyUser, auctionController.getAuctionsByBidderId);

router
  .route("/:auctionId")
  .get(auctionValidation.validate("GET"), auctionController.getAuctionById)
  .put(
    verifyUser,
    auctionController.isSeller,
    auctionController.uploadImage,
    auctionValidation.validate("UPDATE"),
    auctionController.updateAuction
  )
  .delete(
    verifyUser,
    auctionController.isSeller,
    auctionValidation.validate("DELETE"),
    auctionController.deleteAuction
  );

router
  .route("/by/:userId")
  .get(verifyUser, auctionController.getAuctionsBySellerId)
  .post(
    verifyUser,
    auctionController.uploadImage,
    auctionValidation.validate("CREATE"),
    auctionController.createAuction
  );

module.exports = router;
