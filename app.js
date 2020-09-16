var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var User = require("./model/user");

var passport = require("passport");
var passportLocal = require("passport-local");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");
var contactRouter = require("./routes/contact");
var checkoutRouter = require("./routes/checkout");
var cartRouter = require("./routes/cart");
var categoryRouter = require("./routes/category");
var sendSMSRouter = require("./routes/sms");

var app = express();

// passport local
passport.use(
  new passportLocal(function (username, password, cb) {
    User.findOne({ email: username }, function (err, user) {
      if (user) {
        if (user.password == password) {
          cb(null, user);
        } else {
          cb(null, false);
        }
      } else {
        cb(null, false);
      }
    });
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (id, cb) {
  cb(null, { username: "Oday" });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "vash");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })  
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//   res.locals.session = req.session;
//   next();
// });
app.use(function (req, res, next) {
  res.locals.user = req.session.passport ? req.session.passport.user : null;
  //console.log("res.session", res.session);
  //console.log("res.locals.user::", res.locals.user);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/product", productRouter);
app.use("/contact", contactRouter);
app.use("/checkout", checkoutRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/sendSMS", sendSMSRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
