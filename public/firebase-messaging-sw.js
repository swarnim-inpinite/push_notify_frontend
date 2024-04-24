import { messaging } from './firebase'; // Import the messaging object from your firebase.js file

// Listen for messages
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    const { title, body } = payload.notification;
    self.registration.showNotification(title, {
        body: body,
        icon: '/path/to/icon.png' // Specify the path to your notification icon
    });
});


self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(),
    icon: 'icons/icon-192x192.png', // Update with your actual icon path
    badge: 'path/to/badge.png' // Update with your actual badge path
  };
  event.waitUntil(self.registration.showNotification('Notification', options));
});