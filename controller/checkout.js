var Cart = require('../model/cart')
var stripe = require("stripe")('pk_test_51HLT90GBzwG9kERMGEXHwdFaktGjdfAvPgksf8iGvDobxV2Sh4DrLQkMVh7BL9NcbGwctVD4YEpeOpFPotWzpxPZ00l6i8KRSj');

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