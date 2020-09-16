var express = require("express");
var router = express.Router();
var cart = require("../controller/cart");
var User = require('../middlewares/users')

/* GET home page. */
router.get('/',User , cart.getCart);

router.get('/add/:id',User , cart.add)

module.exports = router;
