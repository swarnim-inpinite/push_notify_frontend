self.addEventListener('push', function(event) {
  // Extract notification data from the event
  console.log("eventis", event);
  const data = event.data.json();

  // Display notifications for each user
  sendPushNotifications(data.usersInfo)
    .then((notifications) => {
      // Display each notification
      notifications.forEach((notification) => {
        // Display the notification using showNotification
        self.registration.showNotification(notification.title, {
          body: notification.body,
          // Update with your actual icon and badge paths
          icon: '/path/to/icon.png',
          badge: '/path/to/badge.png'
        });
      });
    })
    .catch((error) => {
      console.error('Error sending push notifications:', error);
    });

  // Tell the service worker to keep the event alive until the notifications are displayed
  event.waitUntil(Promise.resolve());
});
