var mongoose = require("../helper/db");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  facebookId: String,
  picture: String,
  isAdmin: {type : Boolean , default : false},
 
});
const User = mongoose.model("User", userSchema);
module.exports = User;
