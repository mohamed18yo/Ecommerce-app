var express = require("express");
var router = express.Router();
var passport = require("passport");

var users = require("../controller/users");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("This Is Page Private To Users ");
});

router.get("/login", users.getLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  (req,res)=>{
    if(req.session.passport.user.isAdmin){
      res.redirect('/dashboard')
    }else{
      res.redirect('/')
    }
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

router.get("/register", users.getRegister);
router.post("/register", users.register);
router.get("/forgotpass", users.getforgotpass);
router.post("/forgotpass", users.forgotpass);

module.exports = router;
