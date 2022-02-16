import mongoose from "mongoose";

export const notificationsTypes = [
  "new_team_member",
  "removed_team_member",
  "new_assigned_task",
  "new_bug",
];

const schema = mongoose.Schema({
  sender: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      bug: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bugs",
      },
    },
  ],
  receiver: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  type: {
    type: String,
    enum: notificationsTypes,
    required: true,
  },
  readBy: [
    {
      readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    },
  ],
});

const Notification = new mongoose.model("notifications", schema);

export default Notification;
