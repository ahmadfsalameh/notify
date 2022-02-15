import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    minLength: 10,
    maxLength: 100,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minLength: 10,
    maxLength: 1024,
  },
  avatar: {
    type: String,
    required: true,
  },
});

schema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name },
    process.env.jwtSecret
  );
  return token;
};

const User = new mongoose.model("users", schema);

export default User;
