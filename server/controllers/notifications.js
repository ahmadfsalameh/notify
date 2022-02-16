import Notification from "../models/notification.js";

export const createNotification = async (type, sender, receiver) => {
  const notification = new Notification({
    sender: {
      user: sender.user,
      bug: sender.bug,
    },
    receiver,
    type,
  });

  notification.save();
};

export const getNotifications = async (req, res) => {
  const { id } = req.user;

  const notifications = await Notification.find({ receiver: id });
  res.send(notifications);
};