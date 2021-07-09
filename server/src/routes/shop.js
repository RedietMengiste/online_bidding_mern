const express = require("express");
const { verifyUser } = require("../middleware/auth");
const shopValidation = require("../middleware/validation/shop");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getAllShops);

module.exports = router;
