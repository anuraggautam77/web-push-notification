import React, { Component } from 'react';

import PubSub from 'pubsub-js';
import Profilecard from '../components/profile/profilecard';
import Subscription from '../components/notifications/subscription';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentuser: window.localStorage.getItem('userid'),
            isnotify: 'dn',
            alertmessage: '',
            lng: '',
            lat: '',
            message: '',
            city: ''

        };
        PubSub.subscribe('LANDING_MESSGAE', (type, message) => {
            this.setState({"alertmessage": message, isnotify: 'alert alert-success bd'});
        });

        PubSub.subscribe('IS_LOGOUT', (type, message) => {
            this.setState({"currentuser": false});
        });

        this.handleCurrentLocation = this.handleCurrentLocation.bind(this);
        this.getLatlong = this.getLatlong.bind(this);

    }

    getLatlong(event) {
        var self = this, geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': event.target.value}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                self.setState({'lng': results[0].geometry.location.lng(), 'lat': results[0].geometry.location.lat()})
                //  alert("location : " + results[0].geometry.location.lat() + " " +results[0].geometry.location.lng());
                var ll = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];

                var myLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};

                var map = new google.maps.Map(document.getElementById('googleMap'), {
                    zoom: 15,
                    center: myLatLng
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map
                });
 
            } else {
                self.setState({'lng': '', 'lat': ''})
                console.log("Something got wrong " + status);
            }
        });

    }

    handleCurrentLocation() {

        if (this.state.lat !== '' && this.state.lng !== '') {
            fetch('/api/whereiam', {method: 'post', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    latlng: this.state.lat + '--' + this.state.lng,
                    imgUrl: '',
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken')
                })
            }).then(res => res.json()).then(json => {
                console.log(json);
                if (json.status == '200') {
                    this.setState({isnotify: 'alert alert-success bd', "alertmessage": 'Update new location Scucessfully!!'});
                }
            })
        }
    }

    render() {
        return (
                <div className="main-landing row content">
                
                    <div className="banner-container"></div>
                
                
                    <div className={` ${this.state.isnotify} `}>
                        <strong>{this.state.alertmessage}</strong>
                    </div>
                
                    {
                        (() => {
                            if (this.state.currentuser) {
                                return (
                                            <div className="landing-page">
                                        
                                                <div className="col-md-6 col-sm-6">
                                                    <div className="title-col">Set your location</div>
                                                    <div className="panel panel-default">
                                        
                                                        <div className="panel-heading">
                                                            <br/>
                                        
                                                            <input ref='cityname'  onBlur={this.getLatlong}
                                                                   className="form-control input-first" type="text" 
                                                                   placeholder="City Name,Country Name" /> 
                                        
                                                            <input ref='lat' 
                                                                   value={this.state.lat}
                                                                   onChange={(event) => {
                                                    this.setState({lat: event.target.value})}}
                                                                   className="form-control input-first" type="text"  placeholder="Latitude" /> 
                                                            <input ref='lng'
                                                                   value={
                                                        this.state.lng}
                                                                   onChange={
                                                        (event) => {
                                                            this.setState({lng: event.target.value})}}
                                                                   className="form-control" type="text"  placeholder="Longitude" />
                                                            <br/>
                                                            <button  className='btn btn-primary' ref="crntloc" onClick={
                                                                this.handleCurrentLocation} type='button'>Set New Location</button>
                                                            <div id="googleMap" style={{'width': '600px', 'height': '600px'}}></div>                       
                                                            <br/>                  
                                        
                                        
                                        
                                                        </div>
                                                    </div>
                                        
                                                </div>
                                                <div className="col-md-6 col-sm-6 proilecard">
                                                    <div className="title-col">Subscribe Notification</div>
                                                    <Subscription/>
                                                </div>
                                            </div>
                                                                );
                    }else{
                                                                return (
                                                                            <div className="col-md-12 col-sm-12">
                                                                                Log-out User    
                                                                            </div>
                                                                        );
                    }
                
                    })()
                    }
                
                </div>


                                        );
                }
            }

            export default MainPage;
