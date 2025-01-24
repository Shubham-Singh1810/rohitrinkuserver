const Notification = require("../model/notification.Schema");
const addNotification =async (notificationPayload) => {
  console.log(notificationPayload)
  const notification = await Notification.create(notificationPayload);
  return notification;
};

module.exports = { addNotification };
