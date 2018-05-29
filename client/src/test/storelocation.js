
$(document).ready(function () {
    var PWAStore = (function () {
        var serviceurl = 'https://donotifyme.herokuapp.com/api/';
        var CCN, componentWrapper, inputtxt;

       
        var initialization = function () {
            CCN = getCookie('CCN');
            componentWrapper = $('.device-store-locator');
            var template = ' <div style="display: grid;"><a href="javascript:void(0);" class="set-location btn primary large" > SET LOCATION </a>   &nbsp;&nbsp;  <a href="javascript:void(0);" class="dynamic-alert btn primary large" > DYANAMIC ALERTS </a></div>';
            $('.filter-content-wrapper').append(template);
            bindEvents();

        };

        var bindEvents = function () {
            $('body').off('click', '.set-location').on('click', '.set-location', setLocation);
        };

        var setLocation = function (e) {
            e.preventDefault();
             inputtxt = $(".search-field").val();
            if (inputtxt !== '') {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': inputtxt}, (results, status) => {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var myLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                        getsubscriptionData(myLatLng);
                    } else {
                        console.log("Something got wrong " + status);
                    }
                });
            }

        };




        var getsubscriptionData = function (myLatLng) {

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
                  window.localStorage.setItem('zipcodes', inputtxt);
                  window.localStorage.setItem('lat-log', myLatLng.lat + '--' + myLatLng.lng);
                
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