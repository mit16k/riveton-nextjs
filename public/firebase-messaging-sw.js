importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
// // Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyC3iZdBM1NY7le-G49R3BRhCnVTnbZvwiE",
  authDomain: "riveton-963db.firebaseapp.com",
  projectId: "riveton-963db",
  storageBucket: "riveton-963db.appspot.com",
  messagingSenderId: "508179887881",
  appId: "1:508179887881:web:9bcfe01ecb2e68359485d8",
  measurementId: "G-L9F6VJFJ6J",
};


firebase?.initializeApp(firebaseConfig)


// Retrieve firebase messaging
const messaging = firebase.messaging();

self.addEventListener('install', function (event) {
  console.log('Hello world from the Service Worker :call_me_hand:');
});

// Handle background messages
self.addEventListener('push', function (event) {
  const payload = event.data.json();
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});