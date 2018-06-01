var IndexedDBstore = {
    db: null,
    reg: null,

    init: function () {
        if (IndexedDBstore.db) {
            return Promise.resolve(IndexedDBstore.db);
        }
        return idb.open('whereiam_db', 1, function (upgradeDb) {
            upgradeDb.createObjectStore('currentgeo', {autoIncrement: true, keyPath: 'pkey'});
        }).then(function (db) {
            return IndexedDBstore.db = db;
        });
    },
    setup: function (mode) {
        return IndexedDBstore.init().then(function (db) {
            console.log(db);
            return db.transaction('currentgeo', mode).objectStore('currentgeo');
        });
    },

    storeinIdb: function (type, isTrigger) {
        var data = {
            platlng: window.localStorage.getItem('plat-log'),
            pzipcodes: window.localStorage.getItem('pzipcodes'),
            token: window.localStorage.getItem('deviceToken'),
            isnew: true,
            clatlng: window.localStorage.getItem('clat-log'),
            czipcodes: window.localStorage.getItem('czipcodes'),
            type: type

        }

        IndexedDBstore.setup('readwrite').then(function ($opts) {
            return $opts.add(data);
        }).then(function (data) {

            if (isTrigger) {
                return IndexedDBstore.reg.sync.register('currentgeo');
            } else {
                return data;
            }


        })["catch"](function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    },

    getDBData: function (call) {
        IndexedDBstore.setup('readwrite').then(function ($opts) {
            return $opts.getAll();
        }).then(function (data) {

            if (data.length > 0) {
                var updatedLastData = data[data.length - 1];
                window.localStorage.setItem('plat-log', updatedLastData.clatlng);
                window.localStorage.setItem('pzipcodes', updatedLastData.czipcodes);
            }
            call();
            return data;
        })["catch"](function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    }


}
