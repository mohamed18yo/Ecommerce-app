var express = require('express');
var router = express.Router();
var category = require('../controller/category')
var Admin = require('../middlewares/admin')
/* GET home page. */
router.get('/',Admin, category.getCategory)
router.get('/add', Admin, category.getCategoryAdd)
router.post('/add', Admin, category.addCategory)
router.get('/edit/:id',Admin,  category.editCategory)
router.post('/update' , Admin, category.update) 

module.exports = router;   
