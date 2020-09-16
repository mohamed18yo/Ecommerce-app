var express = require("express");
var router = express.Router();
var Admin = require("../middlewares/admin");
var massege = require("../helper/sms");
/* GET home page. */
router.get("/", Admin, function (req, res, next) {
  res.render("admin/sendSMS", { title: "SMS | eCommerce Template" });
});


router.post("/send", (req, res) => {
  let from="Ecommerce App"
  let { phone, text } = req.body;
  massege.sendSms(from, phone, text,(err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

  res.redirect("/sendsms");
  // res.send(phone)
});

module.exports = router;
