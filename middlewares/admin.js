function Admin(req, res, next) {

    if (req.session.passport) {
      if (req.session.passport.user.isAdmin) {
        next();
      } else {
        res.redirect("/users/login");
      }
    } else {
      res.redirect("/users/login");
    }
  }
  
  module.exports = Admin;
  