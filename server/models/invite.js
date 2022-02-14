import mongoose from "mongoose";

const schema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  },
});

const Invite = new mongoose.model("invites", schema);

export default Invite;
