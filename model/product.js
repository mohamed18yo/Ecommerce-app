var mongoose = require('../helper/db')

const productSchema = new mongoose.Schema({
    category: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    title : String,
    price: Number,
    picture: String,
    description: String,
    size : Number,

})
const Product = mongoose.model('Product', productSchema)
module.exports= Product;