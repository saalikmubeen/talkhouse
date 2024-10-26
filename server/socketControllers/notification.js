const webPush = require('web-push');

const sendPushNotification = async ({
  receiver,
  sender,
  message,
}) => {
  if (receiver.pushSubscription.length > 0) {
    receiver.pushSubscription.forEach((sub) => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh,
        },
      };

      console.log('sending push notification');
      webPush
        .sendNotification(
          pushSubscription,
          JSON.stringify({
            title: sender.username,
            body: message.content,
            tag: message._id,
          })
        )
        .then(() => console.log('Push notification sent'))
        .catch((err) => console.log(err));
    });
  }
};

module.exports = sendPushNotification;
