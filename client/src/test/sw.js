importScripts('/etc/designs/clientlibs/alcs/pwacommon/js/pwa/store/idb.js');
importScripts('/etc/designs/clientlibs/alcs/pwacommon/js/pwa/store/store.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');


const version = "0.121.1";
const cacheName = `push-${version}`;
self.addEventListener('install', e => {
    const timeStamp = Date.now();
    e.waitUntil(caches.open(cacheName).then(cache => {
        return cache.addAll([
        ])
                .then(() => self.skipWaiting());
    })
            );


});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {

});

self.addEventListener('sync', function (event) {

    event.waitUntil(IndexedDBstore.setup('readonly').then(function (currentgeo) {
        console.log(currentgeo);
        return currentgeo.getAll();
    }).then(function (messages) {

        if (messages.length > 0) {

            var updatedLastData = messages[messages.length - 1];
            var data = {latlng: null, zipcodes: null};
            data.latlng = updatedLastData.clatlng;
            data.zipcodes = updatedLastData.czipcodes;
            data.time = new Date().toISOString();

            return fetch('https://donotifyme.herokuapp.com/api/getstores', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {

                if (data.stores.length > 0) {
                    const options = {
                        icon: "https://donotifyme.herokuapp.com/img/icons/Icon-57.png"
                    };
                    options.body = data.stores.slice(0, 6).join();
                    const title = "Near by Store Details!";
                    event.waitUntil(self.registration.showNotification(title, options));
                }

            });
        }
    }).catch(function (err) {
        console.error(err);
    })
            );
});

var config = {
    apiKey: "AIzaSyAxUoFv6a4aIOr1UqsS960Vuo2xoQFdki0",
    authDomain: "mystuff-57cd4.firebaseapp.com",
    databaseURL: "https://mystuff-57cd4.firebaseio.com",
    projectId: "mystuff-57cd4",
    storageBucket: "mystuff-57cd4.appspot.com",
    messagingSenderId: "58394593767"
};

firebase.initializeApp(config);

//const messaging = firebase.messaging();


self.addEventListener('push', function (event) {
    console.log('Notification Received.');
    var eventData = event.data.text();
    var obj = JSON.parse(eventData); //Parse the received JSON object.
    const options = {
        icon: obj.notification.icon
    };

    if (obj.data['gcm.notification.showbanner'] === 'true') {
        options.image = obj.data['gcm.notification.image'];
    } else {
        options.body = obj.notification.body;
    }
    const title = obj.notification.title;
    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    //event.waitUntil(clients.openWindow('https://donotifyme.herokuapp.com'));
});