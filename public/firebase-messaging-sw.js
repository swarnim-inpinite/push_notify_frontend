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
