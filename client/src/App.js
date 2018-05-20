import React, {PropTypes, Component} from 'react';
import { withRouter } from "react-router-dom";
import {Auth} from './common/auth';
import PubSub from 'pubsub-js';
import './style/css/App.scss';
import Routing from './router/router';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {"isLoggedIn": window.localStorage.getItem('isLoggedIn')};
        this.mySubscriber = this.mySubscriber.bind(this);
        PubSub.subscribe('IS_LOGIN', this.mySubscriber);
        this.auth = new Auth();
        if (this.state.isLoggedIn) {
            this.auth.activeInterval(this.props.history);
        } else {
            this.auth.stopInterval();
        }

    }

    initGeolocation(callback) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
                if (window.localStorage.getItem('plat-log') === null) {
                    window.localStorage.setItem('plat-log', position.coords.latitude + "--" + position.coords.longitude);
                }
                callback();
            }, function(error){
                console.log("err>",error)
            }, {timeout: 10000});
          
          navigator.geolocation.watchPosition((position)=> {
              console.log(window.localStorage.getItem('plat-log'));
              console.log(position.coords.latitude + "--" + position.coords.longitude)
                   if(window.localStorage.getItem('plat-log')!==position.coords.latitude + "--" + position.coords.longitude){
                       console.log(">>>Change in address")
                       window.localStorage.setItem('plat-log', position.coords.latitude + "--" + position.coords.longitude);  
                         callback();
                   }
              
            }, function(error){
                  console.log("err>",error)
            });  
          
          
        } else {
            console.log('Geolocation is not supported');
        }
    }

    
    componentDidMount() {
        this.initGeolocation( ()=> {
            this.getcode();
        });
        
     
        
    }

    getcode() {
        var lat, lng = '';
        if (window.localStorage.getItem('plat-log') !== null) {
            lat = window.localStorage.getItem('plat-log').split('--')[0];
            lng = window.localStorage.getItem('plat-log').split('--')[1];
            var geocoder = new google.maps.Geocoder;
            var latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
            geocoder.geocode({'location': latlng}, (results, status) => {
                if (status === 'OK') {
                    this.getZipcode(results);
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            }
            )
        }
    }

    getZipcode(place) {

        var zipcodes = [];
        if (Array.isArray(place)) {
            for (var k = 0; k < place.length; k++) {
                for (var i = 0; i < place[k].address_components.length; i++) {
                    for (var j = 0; j < place[k].address_components[i].types.length; j++) {
                        if (place[k].address_components[i].types[j] == "postal_code") {
                            // console.log(place[k].address_components[i].long_name);
                            zipcodes.push(place[k].address_components[i].long_name)
                        }
                    }
                }
            }
        } else {
            for (var i = 0; i < place.address_components.length; i++) {
                for (var j = 0; j < place.address_components[i].types.length; j++) {
                    if (place.address_components[i].types[j] == "postal_code") {
                        // console.log(place.address_components[i].long_name);
                        zipcodes.push(place.address_components[i].long_name);
                    }
                }
            }

        }
        console.log(zipcodes);
        if (zipcodes.length > 0) {
            window.localStorage.setItem('pzipcodes', zipcodes);
            //Store in IndexDB

            store.storeinIdb();
        }
    }

    saveCurrentLocation() {
        if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('plat-log') !== null) {
            fetch('/api/whereiam', {method: 'post', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    platlng: window.localStorage.getItem('plat-log'),
                    pzipcodes: window.localStorage.getItem('pzipcodes'),
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken')
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
            this.saveCurrentLocation();
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
