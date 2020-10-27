importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyC0nxrkH5v1rZgXXmkJZ3JvcOn_BRxHGmE",
    authDomain: "emailshdeule.firebaseapp.com",
    databaseURL: "https://emailshdeule.firebaseio.com",
    projectId: "emailshdeule",
    storageBucket: "emailshdeule.appspot.com",
    messagingSenderId: "126149942558",
    appId: "1:126149942558:web:c2f436b84adea0bc78bd0f"
});
const messaging = firebase.messaging();