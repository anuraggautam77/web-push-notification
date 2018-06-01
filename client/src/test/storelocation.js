/* global IndexedDBstore */

$(document).ready(function () {
    var PWAStore = (function () {
        var serviceurl = 'https://donotifyme.herokuapp.com/api/';
        var CCN, componentWrapper, inputtxt;
        var positionCoords = null;


        var initialization = function () {
            CCN = getCookie('CCN');
            componentWrapper = $('.device-store-locator');

            if (CCN !== null) {
                var template = '<div class="set-location-msg" style="font-size:14px; color:#000"><p></p></div><div style="display: grid;"><a href="javascript:void(0);" class="set-location btn primary large" > SET LOCATION </a>   &nbsp;&nbsp;  <a href="javascript:void(0);" class="dynamic-alert btn primary large" > DYANAMIC ALERTS </a></div>';
                $('.filter-content-wrapper').append(template);
                bindEvents();
            }
        };

        var bindEvents = function () {
            $('body').off('click', '.set-location').on('click', '.set-location', setLocation);
            $('body').off('click', '.dynamic-alert').on('click', '.dynamic-alert', setDynamicLocationHandler);
        };


        var setDynamicLocationHandler = function (e) {
            e.preventDefault();
            getCurrentLoc(function () {
                getcode();
            });
        };

        var getCurrentLoc = function (callback) {


            if (positionCoords === null) {

                if (navigator && navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        positionCoords = position;
                         window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                       // window.localStorage.setItem('clat-log', '37.0902--95.7129');
                        console.log(">>notification trigger", position);
                        callback();
                    }, function (error) {
                        console.log("err>", error);
                    }, {timeout: 10000, enableHighAccuracy: true});

                } else {
                    console.log('Geolocation is not supported');
                }
            } else {
                callback();
            }

        };



        var getcode = function () {

            var lat, lng = '';
            if (window.localStorage.getItem('clat-log') !== null) {
                lat = window.localStorage.getItem('clat-log').split('--')[0];
                lng = window.localStorage.getItem('clat-log').split('--')[1];
                var geocoder = new google.maps.Geocoder;
                var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
                geocoder.geocode({'location': latlng}, function (results, status) {
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
                                zipcodes.push(place[k].address_components[i].long_name);
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
                console.log(">>>>>>>>>>>", zipcodes);
                setDyanamicServicecall(zipcodes[0]);
            } else {
                window.localStorage.setItem('czipcodes', '');
            }
        };


        var setDyanamicServicecall = function (zipcode) {
            $.ajax({
                type: 'POST',
                url: serviceurl + 'setdynamiclocation',
                data: JSON.stringify({
                    platlng: window.localStorage.getItem('clat-log'),
                    pzipcodes: zipcode,
                    userId: CCN,
                    token: window.localStorage.getItem('deviceToken'),
                    time: new Date().toISOString()
                }),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    IndexedDBstore.storeinIdb('dyanamic', true);
                    $(".set-location-msg").text("Set Dyanamic Alerts Scucessfully !!");
                }
            });
            // }
        };



        var setLocation = function (e) {
            e.preventDefault();
            inputtxt = $(".search-field").val();
            if (inputtxt !== '') {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': inputtxt}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var myLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                        setStoreServiceCall(myLatLng);
                    } else {
                        console.log("Something got wrong " + status);
                    }
                });
            }

        };

        var setStoreServiceCall = function (myLatLng) {

            if (myLatLng.lat !== '' && myLatLng.lng !== '') {

                $.ajax({
                    type: 'POST',
                    url: serviceurl + 'setstorelocation',
                    data: JSON.stringify({
                        latlng: myLatLng.lat + '--' + myLatLng.lng,
                        zipcodes: inputtxt,
                        userId: CCN,
                        token: window.localStorage.getItem('deviceToken'),
                        time: new Date().toISOString()
                    }),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        //window.localStorage.setItem('zipcodes', inputtxt);
                        //window.localStorage.setItem('lat-log', myLatLng.lat + '--' + myLatLng.lng);
                        $(".set-location-msg").text("Set location Scucessfully!!");


                    }
                });
            }
        };


        var getCookie = function (name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        };

        return {
            init: initialization
        };
    })();

    PWAStore.init();
});