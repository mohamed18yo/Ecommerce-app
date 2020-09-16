const Category = require("../model/category");

const Product = require("../model/product");
const { log } = require("debug");

exports.getProduct = (req, res, next) => {
  res.render("product", { title: "Product | eCommerce Template" });
};
exports.getAllProduct = (req, res, next) => {
  Product.find((err, products) => {
    res.render("admin/products", {
      title: "Products | eCommerce Template",
      products,
    });
  });
};

exports.getProductAdd = (req, res, next) => {
  Category.find((err, categorise) => {
    res.render("admin/addProduct", {
      title: "Add Product | eCommerce Template",
      categorise,
    });
  });
};

exports.addProduct = (req, res, next) => {
  // res.send(req.body);
  Product.create(req.body).then();
  res.redirect("/product/all");
};

exports.editProduct = async (req, res, next) => {
  var id = req.params.id;
  var result = await Product.findById({ _id: id });
  var category = await Category.findById({ _id: result.category });
  var categorise = await Category.find().then();

  // res.send(product)
  res.render("admin/editProduct", { product: result, category, categorise });
};
exports.updateProduct = (req, res, next) => {
  var id = req.body.id;
  Product.updateOne({ _id: id }, { $set: req.body }, (err) => {
    console.log(err);
  });
  res.redirect("/product/all");
};
exports.deleteProduct = (req, res, next) => {
  var id = req.params.id;

  Product.deleteOne({ _id: id }, (err) => {
    console.log(err);
  });
  res.redirect("/product/all");
};

exports.viewProduct = async (req, res, next) => {
  var id = req.params.id;
  var result = await Product.findById({ _id: id });
  var category = await Category.findById({ _id: result.category });
  res.render("admin/vProduct", { product: result, category });
};
