import React, { Component } from 'react';

import PubSub from 'pubsub-js';
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
        this.handleDyanamicLocation = this.handleDyanamicLocation.bind(this);

    }

    componentDidMount() {

        if (this.state.currentuser !== null) {
            fetch('/api/getsetlocation/' + this.state.currentuser, {
                method: 'get',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
                    .then(json => {

                        if (json.list.length > 0) {
                            window.localStorage.setItem('plat-log', json.list.plat + "--" + json.list.plng);
                            window.localStorage.setItem('lat-log', json.list.lat + "--" + json.list.lng);
                            window.localStorage.setItem('pzipcodes', json.list.pzipcodes);
                            window.localStorage.setItem('zipcodes', json.list.zipcodes);
                        }
                        if (document.getElementById('id_address')) {
                            this.initialize();
                            this.setAutoComplete();
                        }

                    });

        }


    }

    initialize() {
        this.drawMap();
    }

    setAutoComplete() {
        var input = document.getElementById('id_address');
        var options = {
            types: ['address']
        };

        var autocomplete = new google.maps.places.Autocomplete(input, options);
        google.maps.event.addListener(autocomplete, 'place_changed', (i, k) => {
            var place = autocomplete.getPlace();
            // window.localStorage.setItem('lat-log', place.geometry.location.lat() + "--" + place.geometry.location.lng())
            var zipcodes = this.getZipcode(place);
            console.log("onchange", zipcodes);
            this.setState({"zipcodes": zipcodes, "lat": place.geometry.location.lat(), "lng": place.geometry.location.lng()})
            this.drawMap(place.geometry.location.lat(), place.geometry.location.lng());

        });

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

        if (zipcodes.length > 0) {
            return zipcodes[0];
        } else {
            return '';
        }
    }

    drawMap(lt, lg) {

        var lat, lng = '';
        if (lt !== undefined && lt !== undefined) {
            lat = lt;
            lng = lg;
        } else {
            if (window.localStorage.getItem('lat-log') !== null) {
                lat = window.localStorage.getItem('lat-log').split('--')[0];
                lng = window.localStorage.getItem('lat-log').split('--')[1];
            } else if (window.localStorage.getItem('plat-log') !== null) {
                lat = window.localStorage.getItem('plat-log').split('--')[0];
                lng = window.localStorage.getItem('plat-log').split('--')[1];
            }
        }

        var map = new google.maps.Map(document.getElementById("googleMap"), {
            center: new google.maps.LatLng(parseFloat(lat), parseFloat(lng)),
            zoom: 13
        });
    }

    handleDyanamicLocation() {
        if (this.state.lat !== '' && this.state.lng !== '') {
             
            fetch('/api/whereiam', {method: 'post', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    platlng: this.state.lat + '--' + this.state.lng,
                    pzipcodes: this.state.zipcodes,
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken'),
                    time: new Date().toISOString()
                })
            }).then(res => res.json()).then(json => {
                window.localStorage.setItem('pzipcodes', this.state.zipcodes);
                window.localStorage.setItem('plat-log', this.state.lat + '--' + this.state.lng)
                this.setState({isnotify: 'alert alert-success bd', "alertmessage": 'Set Dyanamic location Scucessfully!!'});
                //Store in IndexDB
                store.storeinIdb('dyanamic');
            })
        }
    }

    handleCurrentLocation() {

        if (this.state.lat !== '' && this.state.lng !== '') {
            fetch('/api/setnewlocation', {method: 'post', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    latlng: this.state.lat + '--' + this.state.lng,
                    zipcodes: this.state.zipcodes,
                    userId: window.localStorage.getItem('userid'),
                    token: window.localStorage.getItem('deviceToken'),
                    time: new Date().toISOString()
                })
            }).then(res => res.json()).then(json => {
                console.log(json);
                if (json.status === '200') {
                    window.localStorage.setItem('zipcodes', this.state.zipcodes);
                    window.localStorage.setItem('lat-log', this.state.lat + '--' + this.state.lng)
                    this.setState({isnotify: 'alert alert-success bd', "alertmessage": 'Set new location Scucessfully!!'});
                    //Store in IndexDB
                    //  store.storeinIdb();

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
                                                        <div className="title-col">IQOS - Want to get notified about nearby Mobile Stores?</div>
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading">
                                                                <h5><b>Please share your location. Application will auto notify, when we have Mobile store nearby</b> </h5>
                                                            </div>
                                                            <div className="panel-heading">
                                                                <br/>
                                                                <input ref='cityname' id="id_address"    className="form-control input-first places-autocomplete" type="text"   placeholder="City Name,Country Name" /> 
                                            
                                                                <br/>
                                                                <button  className='btn btn-primary crntlo' ref="crntloc" onClick={
                                                    this.handleCurrentLocation} type='button'>Set Location
                                            
                                                                    &nbsp; <span className="glyphicon glyphicon-map-marker"> </span></button>
                                                                &nbsp;  &nbsp;
                                                                <button  className='btn btn-primary crntlo' ref="crntloc" onClick={
                                                    this.handleDyanamicLocation} type='button' title='Get notified as you move.'>
                                                                    Dynamic Alerts &nbsp; <span className="glyphicon glyphicon-map-marker"> </span></button>
                                            
                                            
                                            
                                                                <br/> 
                                                                <br/>
                                                                <div id="googleMap" className="mapsize"></div>                       
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
                                                            <div style={{'height': '400px'}}></div>                
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
