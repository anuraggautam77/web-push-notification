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

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});






const cacheName = 'final-1';
var filesToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/img/avatars/',
    '/img/bg/',
    '/img/icons/',
    '/img/logo/'
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


self.addEventListener('activate', function (event) {
    //  console.log('[Service Worker] Activating Service Worker ...', event);
    // return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
//event.respondWith(fetch("https://www.google.com"));

    // console.log('[Service Worker] Fetching something ....', event);

});

self.addEventListener('push', function (event) {
    //  console.log('[Service Worker] push something ....', event);
});

self.addEventListener('message', function (event) {
    //  console.log('[Service Worker] message something ....', event);
    console.log(event);
});


self.addEventListener('sync', function (event) {
    //  console.log('[Service Worker] Sync something ....', event);
});

