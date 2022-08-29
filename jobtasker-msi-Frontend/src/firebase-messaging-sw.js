importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyDuIx1PFDZfW6W8IqXJ5feUAboSex4aBTw",
    authDomain: "jobchat-1172c.firebaseapp.com",
    databaseURL: "https://jobchat-1172c-default-rtdb.firebaseio.com",
    projectId: "jobchat-1172c",
    storageBucket: "jobchat-1172c.appspot.com",
    messagingSenderId: "331055457341",
    appId: "1:331055457341:web:b52901c5539c842de8b654"
});
const messaging = firebase.messaging();