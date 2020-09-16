var mongoose = require('../helper/db');

const categorySchema = new mongoose.Schema({
    name:String
})
const Category = mongoose.model('Category', categorySchema)

module.exports= Category;