self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  try {
    console.log("inside try")
    const payload = event.data.json(); 
    console.log("Payload is", payload);

    // Ensure that the payload contains a 'notification' object
    if (!payload.notification) {
      throw new Error('Payload does not contain a notification object');
    }

    const title = payload.notification.title;
    console.log("title is", title);
    const body = payload.notification.body;
    console.log("Body is", body);

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
