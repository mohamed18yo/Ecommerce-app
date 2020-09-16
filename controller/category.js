const { RequestHeaderFieldsTooLarge } = require("http-errors");

var Category = require("../model/category");
var Product = require("../model/product");

exports.getCategory = async (req, res, next) => {
  const product = await Product.find().limit(3);
  const category = await Category.find((err, categorise) => {});
  res.render("admin/category", {
    title: "Category | eCommerce Template",
    categorise: category,
    product,
  });
};

exports.getCategoryAdd = (req, res, next) => {
  res.render("admin/addCategory", {
    title: "Category Add | eCommerce Template",
  });
};

exports.addCategory = (req, res, next) => {
  // res.send(req.body);
  Category.create(req.body).then();
  res.redirect("/category");
};

exports.editCategory = async (req, res, next) => {
  let id = req.params.id;
  const cat = await Category.findById({ _id: id });
  // res.send(category);
  res.render("admin/editCategory", { category: cat });
};

exports.update = (req, res, next) => {
  Category.updateOne({ _id: req.body.id }, { $set: req.body }, (err) => {
    console.log(err);
  });
  res.redirect("/category");
};
