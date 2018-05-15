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
        this.initGeolocation();
    }

    initGeolocation() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback, {timeout: 10000});
        } else {
            console.log('Geolocation is not supported');
        }
    }

    successCallback(position) {
        var ll = [position.coords.latitude, position.coords.longitude].join(',');
        var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
        mapUrl = mapUrl + position.coords.latitude + ',' + position.coords.longitude + "&markers=" + ll;
        mapUrl = mapUrl + '&zoom=15&size=512x512&maptype=roadmap&sensor=false';

        console.log(mapUrl);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);


        window.localStorage.setItem('lat-log', position.coords.latitude + "--" + position.coords.longitude);
        window.localStorage.setItem('mapImg', mapUrl);

    }

    saveCurrentLocation() {

        if (window.localStorage.getItem('deviceToken') !== null && window.localStorage.getItem('lat-log') !== null) {
            fetch('/api/whereiam', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    latlng: window.localStorage.getItem('lat-log'),
                    imgUrl: window.localStorage.getItem('mapImg'),
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken')
                })
            })
                    .then(res => res.json())
                    .then(json => {  console.log(json);  })


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
