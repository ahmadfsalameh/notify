import Notification from "../models/notification.js";

export const createNotification = async (type, sender, receiver) => {
  const notification = new Notification({
    sender: {
      user: sender.user,
      app: sender.app,
      team: sender.team,
    },
    receiver,
    type,
  });

  notification.save();
};

export const getNotifications = async (req, res) => {
  const { id } = req.user;

  const notifications = await Notification.find({ receiver: id })
    .populate("sender.user", ["name", "avatar"])
    .populate("sender.app", "name")
    .populate("sender.team", "name")
    .sort({ _id: -1 });

  res.send(notifications);
};

export const markRead = async (req, res) => {
  const { id } = req.user;

  await Notification.updateMany(
    { receiver: id, readBy: { $ne: id } },
    {
      $push: {
        readBy: id,
      },
    }
  );

  res.send();
};
