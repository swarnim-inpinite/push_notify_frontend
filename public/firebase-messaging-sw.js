self.addEventListener('push', function(event) {
  const options = {
    body: event.data.text(),
    icon: 'icons/icon-192x192.png', // Update with your actual icon path
    badge: 'path/to/badge.png' // Update with your actual badge path
  };
  event.waitUntil(self.registration.showNotification('Notification', options));
});