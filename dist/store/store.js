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

        };

        store.setup('readwrite').then(function ($opts) {
            return $opts.add(data);
        }).then(function (data) {
            if(isTrigger){
                return store.reg.sync.register('currentgeo'); 
            }else{
                return data;
            }
           
        }).catch(function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    },

    setDBData: function (call) {
        store.setup('readwrite').then(function ($opts) {
            return $opts.getAll();
        }).then(function (data) {

            if (data.length > 0) {
                var updatedLastData = data[data.length - 1];
                window.localStorage.setItem('clat-log', updatedLastData.clatlng);
                window.localStorage.setItem('czipcodes', updatedLastData.czipcodes);
            } 
            call();
            return data;
        }).catch(function (err) {
            // something went wrong with the database or the sync registration, log and submit the form
            console.error(err);

        });
    }


}
