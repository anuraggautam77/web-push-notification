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
            message:''
        };
        PubSub.subscribe('LANDING_MESSGAE', (type, message) => {
            this.setState({"alertmessage": message, isnotify: 'alert alert-success bd'});
        });

        PubSub.subscribe('IS_LOGOUT', (type, message) => {
            this.setState({"currentuser": false});
        });

        this.handleCurrentLocation = this.handleCurrentLocation.bind(this);

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
                if(json.status=='200'){
                      this.setState({ isnotify: 'alert alert-success bd', "alertmessage": 'Update new location Scucessfully!!'});
                }
            })
        }
    }

    render() {
        return (
                    <div className="main-landing row content">
                     <div className={` ${this.state.isnotify} `}>
                        <strong>{this.state.alertmessage}</strong>
                    </div>
            
                    {
                            (() => {
                            if (this.state.currentuser) {
                                return (
                                                <div className="landing-page">
                                                    <div className="col-md-3 col-sm-6 proilecard"> 
                                                        <Profilecard/>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6">
                                                        <div className="panel panel-default">
                                                            <div className="panel-heading">
                                                                <br/>
                                                                <input ref='lat' 
                                                                       onChange={(event) => {
                                                        this.setState({lat: event.target.value})}}
                                                                       className="form-control" type="text"  placeholder="Latitude" /> 
                                                                <input ref='lng'
                                                                       onChange={
                                                            (event) => {
                                                                this.setState({lng: event.target.value})}}
                                                                       className="form-control" type="text"  placeholder="Longitude" />
                                                                <br/>
                                                                <button  className='btn btn-primary' ref="crntloc" onClick={
                                                                        this.handleCurrentLocation} type='button'>Set New Location</button>
                                                              
                                        
                                       <br/><br/>
                                       <h3>Delhi</h3>   
                                       Latitude: <b>28.633857</b>  &nbsp; &nbsp;&nbsp; Longitude: <b>77.201217</b>  <br/><br/>
                                       <h3>Dallas (USA)</h3>
                                       Latitude: <b>32.7909263</b>     &nbsp; &nbsp;&nbsp; Longitude : <b>-96.8200647</b>  
                                       
                                        
                                        
                                        
                                        </div>
                                                            
        
            
                                                            
                                                            
                                                            
                                                        </div>
                                                   
                                                    </div>
                                                    <div className="col-md-3 col-sm-6 proilecard">
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
