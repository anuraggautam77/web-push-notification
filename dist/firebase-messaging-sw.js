
const cacheName = 'final-1';
var filesToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/img/bg/',
    '/img/icons/'
   
]
self.addEventListener('install', function (event) {
    //  console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
            caches.open(cacheName).then(function (cache) {
        //  console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
    })
            );

});

 


importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyAxUoFv6a4aIOr1UqsS960Vuo2xoQFdki0",
    authDomain: "mystuff-57cd4.firebaseapp.com",
    databaseURL: "https://mystuff-57cd4.firebaseio.com",
    projectId: "mystuff-57cd4",
    storageBucket: "mystuff-57cd4.appspot.com",
    messagingSenderId: "58394593767"
};
firebase.initializeApp(config);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
   
});


self.addEventListener('push', function (event) {

    console.log('Push Notification Received.');
    console.log('Push Notification had this data: "${event.data.text()}"');
    console.log(event);
    var eventData = event.data.text();
    var obj = JSON.parse(eventData); //Parse the received JSON object.
    const title = obj.notification.title;
    const options = {
        body: obj.notification.body,
        icon: 'https://donotifyme.herokuapp.com/img/bg/bg.jpg',
        badge: 'https://donotifyme.herokuapp.com/img/bg/bg.jpg'
    };

    event.waitUntil(self.registration.showNotification(title, options));
});
