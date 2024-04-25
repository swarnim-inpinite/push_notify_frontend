self.addEventListener('push', function(event) {
  console.log("Event is", event);
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/path/to/icon.png', // Update with your icon path
    badge: '/path/to/badge.png' // Update with your badge path
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
