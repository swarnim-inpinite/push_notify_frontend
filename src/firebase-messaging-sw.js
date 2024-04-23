// firebase-messaging-sw.js

self.addEventListener('push', function(event) {
  const title = 'New Event Notification Firebase';
  const body = 'A new event has been added!';
  
  const options = {
    body: body,
    icon: 'cal_icon.png', 
    badge: 'path/to/badge.png' // Update with your actual badge path
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});
