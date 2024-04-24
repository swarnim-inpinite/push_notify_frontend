self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  try {
    const payload = event.data.json(); // Assuming the push payload is in JSON format

    // Ensure that the payload contains a 'notification' object
    if (!payload.notification) {
      throw new Error('Payload does not contain a notification object');
    }

    const title = payload.notification.title;
    const body = payload.notification.body;

    const options = {
      body: body,
      title: title
    };

    // Display the notification
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error('Error handling push event:', error);
  }
});
