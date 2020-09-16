var express = require("express");

var router = express.Router();
var Admin = require("../middlewares/admin");
var User = require("../middlewares/users");
var Product = require("../model/product");
var Cart = require('../model/cart')
/* GET home page. */
router.get("/", async function (req, res, next) {
  var latestProduct = await Product.find({
    category: "5f44f1780fa15029e8ae150b",
  });
  let userId= req.session.passport ? req.session.passport.user._id : null;
  let count= await Cart.countDocuments({user: userId})
  var Products = await Product.find().then();

  res.render("index", {
    title: "Divisima | eCommerce Template",
    Products,
    latestProduct,
    count
  });
});
router.get("/dashboard", Admin, User, function (req, res, next) {
  res.render("dashboard", { title: "Divisima | dashboard Template" });
});

module.exports = router;
