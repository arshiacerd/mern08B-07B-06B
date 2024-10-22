const mongoose = require("mongoose");



mongoose
  .connect("mongodb://localhost:27017/nodejs")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("not connected", error));
// schema

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// use model
const User = mongoose.model("Signups", userSchema);
module.exports= User;