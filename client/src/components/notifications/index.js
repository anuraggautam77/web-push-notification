import React, { Component } from "react";
class DeviceList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ptype: '',
            isnotify: 'dn',
            text: 'Hi {{name}}, Nice to have your',
            title: 'Lets Connect',
            lbanner: false,
            pbanner: false,
            isdisable: true,
            bodytext: 'db',
            imageicon: 'dn',
            selectedimg:'',
            flag:'',
            arrImage:[]
        };
        //  this.refs.senbutton.setAttribute('disable','disable');
        this.handleSignIn = this.sendNotification.bind(this);

        this.divStyle = {
            'listStyle': 'none',
            'marginLeft': '-40px',
            'marginTop': '20px'
        };

    }

    componentWillMount() {

        fetch(`/api/getpromoimages`, {method: 'get', headers: {'Content-Type': 'application/json'}}
        ).then(res => res.json()
        ).then(json => {
            if (json.hasOwnProperty('images')) {
                this.setState({arrImage: json.images});
            }
        });
    }

    sendNotification(flag) {
        if (this.state.ptype == '') {
            alert('Please Select Catageory !')
            return false;
        }
        this.setState({'isdisable': true});
        this.state.flag=flag;

        fetch('/api/postnotification', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        ).then(res => res.json()).then(json => {
            this.setState({'isdisable': false, isnotify: 'alert alert-success bd', "alertmessage": json.message});
        });

    }

    sendGeoNotification(flag) {

        fetch('/api/geopostnotification', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({lbanner: this.state.lbanner,selectedimg:this.state.selectedimg,flag:flag})
        }
        ).then(res => res.json()).then(json => {
            console.log(json)
            this.setState({'isdisable': false, isnotify: 'alert alert-success bd', "alertmessage": json.message});

        });
    }
    
    
    
     commentDatalist(list){
     
       let commentlist= list.map((obj,i) =>{
              return (
                      <li className="col-sm-3" style={{'marginBottom':'20px'}} attr={obj}  key={i} 
                    onClick={(event) => {
                         this.setState({'border':'1px solid red',key:i,'selectedimg':(event.currentTarget).getAttribute('attr')});
                   }} 
            >
                 <a className="thumbnail" style={ (()=>{
                  if(this.state.key===i){ return ({border:this.state.border})  }  })()  } 
                           
                        id="carousel-selector-0">
                             <img src={`img/promoimages/${obj}`} style={{'width':'100px','height':'100px'}} />
                      </a>
            </li>
             );
                                
         }); 
                            
        return commentlist;
    }

    render() {
        return (
                <div className="col-md-12">
                
                    <h3>Push Notifications Dashboard</h3>
                    <div className={` ${this.state.isnotify} `}>
                        <strong>{this.state.alertmessage}</strong>
                    </div>
                    <div className="col-md-6">
                        <h4>Promotions Notifications</h4>
                        <div className="panel panel-default panel-order">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        Select Catageory:
                        <select onChange={(event) => {
                        let disable = true;
                        if (event.target.value !== '') {
                                disable = false;
                             this.setState({ 'ptype': event.target.value, 'isdisable': disable })
                        }}} 
                                           
                        className="form-control">
                                            <option value="">Select one</option>
                                            <option value="c">Coupons</option>
                                            <option value="p">Promotions</option>
                                        </select>
                
                
                                        <br/>
                
                
                                        <p> Add your customize Notification Message below</p>  
                                        <input type="text" id="title"   value ={ this.state.title}  className="form-control" 
                                               placeholder="Title"
                                               onChange={(event) => {
                                    this.setState({title: event.target.value})}}   />
                                        <br/> 
                                        <p> Show Banner in Notification: 
                                            <input type="checkbox"  ref='showPbanner'  onChange={
                                        (event) => {
                                            if (event.target.checked) {
                                                this.setState({'pbanner': event.target.checked, 'bodytext': 'dn', 'imageicon': 'db'});
                                                   }else{
                                                       this.setState({'pbanner': event.target.checked, 'bodytext': 'db', 'imageicon': 'dn'});
                                                   }
                
                                                   }
                                                   }
                                                   /></p>  
                
                
                                        <br/>
                
                   <div  id="slider-thumbs" className={this.state.imageicon}>
                
                     <ul  style={this.divStyle}  className="hide-bullets">
                            { this.commentDatalist (this.state.arrImage) } 
                                               
                        </ul>
                  </div>
                                        <br/>
                
                                        <div className={ this.state.bodytext}>
                                            <textarea type="text" id="body"  className="form-control"  placeholder="Hi {{name}}" 
                                                      value ={ this.state.text}  onChange={(event) => {
                                                                this.setState({text: event.target.value})}}   />  
                                        </div>    
                                        <br/> 
                
                                        <div style={{'clear': 'both'}}>
                                            <button ref='senbutton' disabled={ this.state.isdisable}
                                                    type="button"  onClick={ (e) => {
                                                                            this.sendNotification("");
                                  }}
                                                    className="btn btn-primary">Send Notification</button> 
                                         &nbsp;
                                            <button ref='senbutton' disabled={ this.state.isdisable}
                                                    type="button"  onClick={ (e) => {
                                                                            this.sendNotification("m");
                                  }}
                                                    className="btn btn-primary">Trigger Marlboro Notification</button> 
                                        </div>
                                        
                                        
                                        
                                        
                                        
                                        
                
                                    </div>
                                </div>
                            </div>
                
                
                        </div>
                    </div>
                
                    <div className="col-md-6">
                        <h4>Near-By Store Notifications</h4>
                        <div className="panel panel-default panel-order">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-md-12"> 
                
                                        <p> Show Banner in Notification : <input type="checkbox" ref='showLbanner' 
                                                                                 onChange={
                                                                            (event) => {
                                                                                this.setState({'lbanner': event.target.checked});
                                                                                 }}
                                                                                 /></p>  
                                        <br/>
                
                                        <button ref='nearbybutton' 
                                                onClick={  (e) => {  this.sendGeoNotification('') }}
                                                className="btn btn-primary">Send Notification</button> 
                                                
                                        &nbsp;
                                            <button ref='senbutton'  
                                                    type="button"  onClick={ (e) => {  this.sendGeoNotification("m");  }}
                                                    className="btn btn-primary"> IQOS Store Notification</button>
                                                
                                                
                                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                
                
                
                
                </div>
                                                                                    );
                                }
                            }

                            export default DeviceList;



