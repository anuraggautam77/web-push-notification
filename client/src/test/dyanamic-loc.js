/* global IndexedDBstore */

$(document).ready(function () {
    var DyanamicLocation = (function () {
        var unit = "K"; // 'M' is statute miles (default) , 'K' is kilometers  , 'N' is nautical miles
        var distanceupto = 10;

        var checkDistanceBetweenlocation = function (oldloc, newloc) {

            if (oldloc === null || oldloc === undefined || oldloc === '') {
                window.localStorage.setItem('clat-log', newloc.latitude + "--" + newloc.longitude);
                IndexedDBstore.storeinIdb('moving',false);
                return 0;
            }


            var lat1 = oldloc.split("--")[0];
            var lat2 = newloc.latitude;
            var lon1 = oldloc.split("--")[1];
            var lon2 = newloc.longitude;
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            //  var radlon1 = Math.PI * lon1 / 180
            // var radlon2 = Math.PI * lon2 / 180
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") {
                dist = dist * 1.609344;
            }
            if (unit === "N") {
                dist = dist * 0.8684;
            }
            console.log("Distance Differce b/w Location >>>:" + dist);
            return dist;
        };


        var initialization = function () {
            getCurrentLoc(function() {
                getcode();
            });
        };
        var getCurrentLoc = function (callback) {
            var distance;
            if (navigator && navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position)  {

                    IndexedDBstore.getDBData(function() {
                        distance = checkDistanceBetweenlocation(window.localStorage.getItem('plat-log'), position.coords);
                        if (distance > distanceupto) {
                            window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                            console.log(">>notification trigger");
                            callback();
                        }
                    });
                }, function (error) {
                    console.log("err>", error);
                }, {timeout: 20000});
                navigator.geolocation.watchPosition(function(position) {
                    IndexedDBstore.getDBData(function() {
                        distance = checkDistanceBetweenlocation(window.localStorage.getItem('plat-log'), position.coords);
                        if (distance > distanceupto) {
                            window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                            console.log(">>notification trigger");
                            callback();
                        }
                    });
                }, function (error) {
                    console.log("err>", error);
                });
            } else {
                console.log('Geolocation is not supported');
            }
        };
        var getcode = function () {
            var lat, lng = '';
            if (window.localStorage.getItem('clat-log') !== null) {
                lat = window.localStorage.getItem('clat-log').split('--')[0];
                lng = window.localStorage.getItem('clat-log').split('--')[1];
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
                geocoder.geocode({'location': latlng},function (results, status) {
                    if (status === 'OK') {
                        getZipcode(results);
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                }
                );
            }
        };

        var getZipcode = function (place) {

            var zipcodes = [];
            if (Array.isArray(place)) {
                for (var k = 0; k < place.length; k++) {
                    for (var i = 0; i < place[k].address_components.length; i++) {
                        for (var j = 0; j < place[k].address_components[i].types.length; j++) {
                            if (place[k].address_components[i].types[j] === "postal_code") {
                                zipcodes.push(place[k].address_components[i].long_name)
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < place.address_components.length; i++) {
                    for (var j = 0; j < place.address_components[i].types.length; j++) {
                        if (place.address_components[i].types[j] === "postal_code") {
                            zipcodes.push(place.address_components[i].long_name);
                        }
                    }
                }

            }

            if (zipcodes.length > 0) {
                window.localStorage.setItem('czipcodes', zipcodes[0]);
                //Store in IndexDB
                IndexedDBstore.storeinIdb('moving',true);
            } else {
                window.localStorage.setItem('czipcodes', '');
            }
        };
        return {
            init: initialization
        };
    })();
    DyanamicLocation.init();
});