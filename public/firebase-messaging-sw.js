self.addEventListener('push', function(event) {
  const payload = event.data.json(); // Assuming the push payload is in JSON format

  const options = {
    body: payload.body, // Extracting the body from the payload
    title: payload.title // Extracting the title from the payload
  };

  event.waitUntil(self.registration.showNotification(options.title, options));
});
