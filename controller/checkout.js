var Cart = require('../model/cart')


var stripe = require("stripe")('sk_test_51H05bOK3cWb5DhxO5FqUia6EpcbjTdUfIw1PLwsbMcNO3dfBrs0gTh177Oj2oMTk9iF2kcuK28hFAhcKPy20os3V00UtHPLVaO');

exports.getCheckout= async(req, res, next )=>{
    var userId = req.session.passport.user._id;
    let carts = await Cart.find({ user: userId }, (result) => {}).populate(
        "product"
      );
    async function sumCart(cart) {
        return new Promise((resolve, reject) => {
          var total = 0;
          cart.forEach((c) => {
            total += c.product.price * c.count;
          });
          resolve(total);
        });
      }
      let total = await sumCart(carts)
// res.send(carts)
    res.render('checkout', { title: 'Checkout | eCommerce Template',carts, total });
}

//ecommerc@gmail.com
//Stipe5411057+