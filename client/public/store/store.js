var store = {
    db: null,

    dbsec: null,
    reg: null,

    init: function () {
        if (store.db) {
            return Promise.resolve(store.db);
        }
        return idb.open('whereiam_db', 1, function (upgradeDb) {
            upgradeDb.createObjectStore('currentgeo', {autoIncrement: true, keyPath: 'pkey'});
        }).then(function (db) {
            return store.db = db;
        });
    },

    initSec: function () {
        if (store.dbsec) {
            return Promise.resolve(store.dbsec);
        }
        return idb.open('whereiam_db', 1, function (upgradeDb) {
            upgradeDb.createObjectStore('movingloc', {autoIncrement: true, keyPath: 'pkey'});
        }).then(function (db) {
            return store.dbsec = db;
        });
    },

    setupSec: function (mode) {
        return store.initSec().then(function (db) {
            console.log(db);
            return db.transaction('movingloc', mode).objectStore('movingloc');
        });
    },

    setup: function (mode) {
        return store.init().then(function (db) {
            console.log(db);
            return db.transaction('currentgeo', mode).objectStore('currentgeo');
        });
    },

    storeinIdb: function (type) {
        var data = {
            platlng: window.localStorage.getItem('plat-log'),
            pzipcodes: window.localStorage.getItem('pzipcodes'),
            token: window.localStorage.getItem('deviceToken'),
            isnew: true,
            clatlng: window.localStorage.getItem('clat-log'),
            czipcodes: window.localStorage.getItem('czipcodes'),
            type:type
           
        };
        
        console.log(data);
        
        store.setup('readwrite').then(function ($opts) {
            return $opts.add(data);
        }).then(function (data) {
            return store.reg.sync.register('currentgeo');
        }).catch(function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    },

    /* storeinMovedb: function () {
     var data = {
     latlng: window.localStorage.getItem('clat-log'),
     zipcodes: window.localStorage.getItem('czipcodes'),
     token: window.localStorage.getItem('deviceToken'),
     isnew: true
     };
     store.setup('readwrite').then(function ($opts) {
     return $opts.add(data);
     }).then(function (data) {
     return store.reg.sync.register('movingloc');
     }).catch(function (err) {
     // something went wrong with the database or the sync registration, log and submit the form
     console.error(err);
     
     });
     } */




}
