const Cart = require("../model/cart");

const Product = require("../model/product");
const { log } = require("debug");

exports.getCart = async (req, res, next) => {
  var userId = req.session.passport.user._id;

  let count = await Cart.countDocuments({ user: userId });

  let carts = await Cart.find({ user: userId }, (result) => {}).populate(
    "product"
  );
  let products = await Product.find().limit(4);

  async function sumCart(cart) {
    return new Promise((resolve, reject) => {
      var total = 0;
      cart.forEach((c) => {
        total += c.product.price * c.count;
      });
      resolve(total);
    });
  }
  
  let amount = await sumCart(carts);
  res.render("cart", {
    title: "Cart | eCommerce Template",
    carts,
    count,
    products,
    amount,
  });
};

exports.add = (req, res, next) => {
  let id = req.session.passport.user._id;
  Cart.findOne({ user: id, product: req.params.id }, (err, cart) => {
    if (cart == null) {
      Cart.create({
        user: id,
        product: req.params.id,
      }).then((result) => {
        res.redirect("/");
      });
    } else {
      cart.count++;
      Cart.updateOne(
        { user: id, product: req.params.id },
        cart,
        (err, result) => {
          res.redirect("/");
        }
      );
    }
  });
};
