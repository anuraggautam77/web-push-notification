import React, {PropTypes, Component} from 'react';
import { withRouter } from "react-router-dom";
import {Auth} from './common/auth';
import PubSub from 'pubsub-js';
import './style/css/App.scss';
import Routing from './router/router';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "isLoggedIn": window.localStorage.getItem('isLoggedIn'),
            "unit": "K", // 'M' is statute miles (default) , 'K' is kilometers  , 'N' is nautical miles
            "distanceupto": 20
        };
        this.mySubscriber = this.mySubscriber.bind(this);
        PubSub.subscribe('IS_LOGIN', this.mySubscriber);
        this.auth = new Auth();
        if (this.state.isLoggedIn) {
            this.auth.activeInterval(this.props.history);
        } else {
            this.auth.stopInterval();
        }

    }

    componentDidMount() {
        this.getCurrentLoc(() => {
            this.getcode();
        });
    }

    checkDistanceBetweenlocation(oldloc, newloc) {
        let lat1 = oldloc.split("--")[0];
        let lat2 = newloc.latitude;

        let lon1 = oldloc.split("--")[1];
        let lon2 = newloc.longitude;


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
        if (this.state.unit === "K") {
            dist = dist * 1.609344;
        }
        if (this.state.unit === "N") {
            dist = dist * 0.8684;
        }
        console.log("Distance Differce b/w Location >>>:" + dist);
        return dist;

    }

    getCurrentLoc(callback) {
        var distance;
        if (navigator && navigator.geolocation) {

            navigator.geolocation.getCurrentPosition((position) => {

                store.setDBData(()=> {

                    if (window.localStorage.getItem('clat-log') === null) {
                        window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                        callback();
                    } else {

                        console.log(window.localStorage.getItem('clat-log'));
                        distance = this.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);

                        if (distance > this.state.distanceupto) {
                            window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                            console.log(">>notification trigger");
                            callback();
                        }
                    }

                });

            }, function (error) {
                console.log("err>", error);

            }, {timeout: 10000});


            navigator.geolocation.watchPosition((position) => {
                store.setDBData( ()=> {
                    if (window.localStorage.getItem('clat-log') === null) {
                        window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                        callback();
                    } else {
                        distance = this.checkDistanceBetweenlocation(window.localStorage.getItem('clat-log'), position.coords);

                        if (distance > this.state.distanceupto) {
                            window.localStorage.setItem('clat-log', position.coords.latitude + "--" + position.coords.longitude);
                            console.log(">>notification trigger");
                            callback();
                        }
                    }
                });

            }, function (error) {
                console.log("err>", error);
            });


        } else {
            console.log('Geolocation is not supported');
        }



    }

    getcode() {
        var lat, lng = '';
        if (window.localStorage.getItem('clat-log') !== null) {
            lat = window.localStorage.getItem('clat-log').split('--')[0];
            lng = window.localStorage.getItem('clat-log').split('--')[1];
            var geocoder = new google.maps.Geocoder;
            var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
            geocoder.geocode({'location': latlng}, (results, status) => {
                if (status === 'OK') {
                    this.getZipcode(results);
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            }
            );
        }
    }

    getZipcode(place) {

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
            store.storeinIdb('moving');
        } else {
            window.localStorage.setItem('czipcodes', '');
        }
    }

    saveCurrentLocation() {
        if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {
            fetch('/api/whereiam', {method: 'post', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    platlng: window.localStorage.getItem('plat-log'),
                    pzipcodes: window.localStorage.getItem('pzipcodes'),
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken'),
                    time: new Date().toISOString()
                })
            }).then(res => res.json()).then(json => {
                console.log(json);
            })
        }
    }

    mySubscriber(msg, data) {

        if (data.status) {
            window.localStorage.setItem('accessToken', data.token);
            window.localStorage.setItem('userid', data.userid);
            window.localStorage.setItem('isLoggedIn', true);
            this.auth.activeInterval(this.props.history);
            //   this.saveCurrentLocation();
        } else {
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('isLoggedIn');
            this.auth.stopInterval();
        }
        this.isLoggedIn(data);
    }
    isLoggedIn(data) {
        var boolFlag = window.localStorage.getItem('isLoggedIn');
        if (data.hasOwnProperty('callback')) {
            data.callback();
        }

        if (!data.status) {
            PubSub.publish('IS_LOGOUT');
        }

        this.setState({
            isLoggedIn: (boolFlag !== null && boolFlag !== '') ? JSON.parse(boolFlag) : false
        });
    }
    render() {
        return (
                <div>
                    <Routing islogin={this.state.isLoggedIn} />
                </div>);
    }
}

export default withRouter(App);
