import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 100,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "apps",
    required: true,
  },
});

const Team = new mongoose.model("teams", schema);

export default Team;
