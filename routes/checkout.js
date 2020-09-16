var express = require('express');
var router = express.Router();

var checkout = require('../controller/checkout');
const { use } = require('passport');
const user = require('../middlewares/users');

/* GET home page. */
router.get('/',user , checkout.getCheckout ) 

module.exports = router;   
