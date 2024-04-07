import React, { useState, useEffect } from 'react';
import CalendarComponent from '../components/Calendar';


function WelcomePage() {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    if (notificationPermission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }
  }, []); // Run once on component mount


  const renderPermissionModal = () => {
    return (
      <div>
        <h2>Notification Permission Required</h2>
        <p>This application would like to send you notifications.</p>
      </div>
    );
  };

  return (
    <div>
    <h1>Calendar Page</h1>
    {notificationPermission !== 'granted' && renderPermissionModal()}
    <CalendarComponent/>
  </div>
  );
}

export default WelcomePage;
