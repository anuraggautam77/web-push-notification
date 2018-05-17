
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
    event.waitUntil( caches.open(cacheName).then(function (cache) {
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

//const messaging = firebase.messaging();

//messaging.setBackgroundMessageHandler(function (payload) {

//});


self.addEventListener('push', function (event) {
    console.log('Push Notification Received.');

    var eventData = event.data.text();
    var obj = JSON.parse(eventData); //Parse the received JSON object.
    const options = {
           icon: obj.notification.icon,
     };

    if (obj.data['gcm.notification.showbanner'] === 'true') {
          options.image=obj.data['gcm.notification.image'];
     }else{
            options.body=obj.notification.body;
     }

    const title = obj.notification.title;

    event.waitUntil(self.registration.showNotification(title, options));
});


//Adding `notification` click event listener
self.addEventListener('notificationclick', (event) => {
  var url = 'https://donotifyme.herokuapp.com/';

  //Listen to custom action buttons in push notification
 /* if (event.action === 'yes') {
    console.log('I ♥ this app!');
  }
  else if (event.action === 'no') {
    console.warn('I don\'t like this app');
  }
 */
  event.notification.close(); //Close the notification

  //To open the app after clicking notification
  event.waitUntil(
    clients.matchAll({ type: 'window' })
    .then((clients) => {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        //If site is opened, focus to the site
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      //If site is cannot be opened, open in new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  );
});

