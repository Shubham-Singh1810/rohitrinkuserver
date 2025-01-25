const Notification = require("../model/notification.Schema");
const addNotification =async (notificationPayload) => {
  const notification = await Notification.create(notificationPayload);
  return notification;
};

module.exports = { addNotification };
