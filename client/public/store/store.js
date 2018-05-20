var store = {
    db: null,
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

    setup: function (mode) {
        return store.init().then(function (db) {
            return db.transaction('currentgeo', mode).objectStore('currentgeo');
        });
    },

    storeinIdb: function () {
        var data = {
            latlng: window.localStorage.getItem('plat-log'),
            zipcodes: window.localStorage.getItem('pzipcodes'),
            token: window.localStorage.getItem('deviceToken'),
            isnew: true
        };
        store.setup('readwrite').then(function ($opts) {
            return $opts.add(data);
        }).then(function (data) {

            return store.reg.sync.register('currentgeo');
        }).catch(function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    }




}
