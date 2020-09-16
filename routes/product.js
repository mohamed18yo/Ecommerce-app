var express = require("express");
var router = express.Router();
var product = require("../controller/product");
var Admin = require('../middlewares/admin')
/* GET home page. */
router.get("/", product.getProduct);
router.get("/all",Admin, product.getAllProduct);
router.get("/add",Admin, product.getProductAdd);
router.post("/add",Admin, product.addProduct);
router.get("/edit/:id",Admin, product.editProduct);
router.post("/edit",Admin, product.updateProduct);
router.get("/delete/:id",Admin, product.deleteProduct);
router.get("/view/:id",Admin, product.viewProduct);

module.exports = router;
