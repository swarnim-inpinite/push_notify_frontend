// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth instance
const messaging = getMessaging(app) 

// Add service worker registration
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Firebase Messaging Service Worker Registered:", registration);
      })
      .catch((error) => {
        console.error("Error registering Firebase Messaging Service Worker:", error);
      });
  });
}



export const generatetoken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log(permission)
    const token = await getToken(messaging, {
      vapidKey: "BP-DgHfWYv1jnpmNxSBxV4YWOjAcd2ad_7ubSdnhBV6dPkrz2NW70H7Lf7maa44zW-dmDIPyfyhJSNJ90pQgtoo"
    })
    return token; // Return the token
  } catch(error){
    console.log("Error is", error)
  }
 
}






export { auth, messaging};