import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  type: String
});

// Add static method (like your getAll())
userSchema.statics.getAll = function () {
  return this.find();
};

// Add instance method if needed
userSchema.methods.isSeller = function () {
  return this.type === "seller";
};

const User = mongoose.model("User", userSchema);

export default User;