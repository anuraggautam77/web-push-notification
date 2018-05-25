import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../containers/login';
import MainPage from '../containers/mainpage';
import NavMenu from '../components/navigation/nav';
import Notification from '../containers/fcm';

export default class Routing extends Component {
    
    constructor(props) {
        super (props);
       
    }
  
    render() {
     
        return (
            <Router>
               <div>
                <div className="container-full">
                      <NavMenu islogin={this.props.islogin}/>
                 </div>
                 <div className="container">
                    <Route path="/"   exact component={Login} />
                    <Route path="/main"   component={MainPage} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/fcm" exact component={Notification} />
                   
                   
                </div>
                <div className="footer-continer">©&nbsp;2018&nbsp; All Rights Reserved</div>
             </div>      
            </Router>
        )
    }
};
