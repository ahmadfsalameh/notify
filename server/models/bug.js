import mongoose from "mongoose";

export const bugStatus = ["unassigned", "open", "underdevelopment", "closed"];

const schema = mongoose.Schema({
  message: {
    type: String,
    trim: true,
    required: true,
    maxLength: 512,
  },
  error: {
    type: String,
    trim: true,
    maxLength: 1024,
  },
  ip: {
    type: String,
    trim: true,
    minLength: 10,
    maxLength: 100,
  },
  userAgent: {
    type: String,
    trim: true,
    minLength: 10,
    maxLength: 200,
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "apps",
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  status: {
    type: String,
    enum: bugStatus,
    default: "unassigned",
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Bug = new mongoose.model("bugs", schema);

export default Bug;
