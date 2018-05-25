const Users = require('../../models/User');
const UsersDetails = require('../../models/Userdetails');
const UserController = require('../../userController');
 
const Geo = require('../../models/geoloc');

const Fcm = require('../../models/fcm');

const Devicefcm = require('../../models/devicefcm');



const bcrypt = require('bcrypt');
const Cryptr = require('cryptr');
const jwt = require('jsonwebtoken');
const request = require('request');
const mongoose = require('mongoose');
const path = require('path');

const promoimgages = path.resolve("dist/img/promoimages");
const fs = require('fs');

const saltRounds = 10;
const SECRETKEY = 'iamnewinthistechstack';
const USER_ID_ENCRYPT_DECTYPT = 'user_id_incrption_decription';
const SECRETKEY_WRONG = 'wrongtoken';
const DUPLICATE_CODE = 11000;
const folderpath = path.resolve("server/upload/images");
const SERVICE_CONST = {
    NEW_USER: "newuser",
    SIGN_IN: "singin",
    AUTH_VALIDATE: "authvalidate",
    NEW_TOKEN: "newtoken",
    GET_USER_LIST: "getuserlist",
    GET_USER_DETAIL: "getuserdetail",
    USER_UPDATE_DETAIL: "updateuserdetail",
    UPDATE_USER_DATA: 'updateuserdata',
  
  
    USER_FCM: 'savefcm',
    GET_FCM: 'getfcm',
    
    USER_DEVICE_FCM: 'savedevicefcm',
    GET_DEVICE_FCM: 'getdevicefcm',
    GET_CCN_NOTIFICATION:'getccnnotification',
    
    
    GET_SUB_NOTIFICATION: 'subnotification',
    
    GET_LOC_DETAIL: 'getsetlocation',
    POST_NOTIFICATION: 'postnotification',
    GET_PROMO_IMAGES: 'getpromoimages',
    POST_GEO: 'geopostnotification',
    WHERE_I_AM: 'whereiam',
    SET_NEW_LOCATION: 'setnewlocation',
    GET_STORES: 'getstores'

};
let cryptr = new Cryptr(USER_ID_ENCRYPT_DECTYPT);
module.exports = (apiRoutes) => {

    function  generateNewToken(userId) {
        var token = jwt.sign({auth: userId}, SECRETKEY, {expiresIn: '20000'});
        return token;
    }

    function tokenVerify(req, res) {

        let token = req.headers['x-access-token'],
                userid = req.headers['id'], obj = {};
        if (token) {
            jwt.verify(token, SECRETKEY, function (err, decoded) {
                if (decoded === undefined) {
                    obj.status = 403;
                    obj.message = 'No token provided>>';
                } else if (decoded.auth === cryptr.decrypt(userid)) {
                    obj.status = 200;
                    obj.message = 'valid token>>>>>';
                } else {
                    obj.status = 403;
                    obj.message = 'Invalid token>>>>>';
                }
            });
        } else {
            obj.status = 403;
            obj.message = 'Invalid token';
        }

        return obj;
    }


    apiRoutes.get(`/${SERVICE_CONST.GET_PROMO_IMAGES}`, function (req, res) {
        var arrofImages = [];
        fs.readdirSync(promoimgages).forEach((file, k) => {
            arrofImages.push(file);
        });
        res.status(200).json({status: 200, images: arrofImages});
    });


    apiRoutes.post(`/${SERVICE_CONST.AUTH_VALIDATE}`, function (req, res) {
        let objCheck = tokenVerify(req, res);
        res.status(objCheck.status).json({status: objCheck.status, message: objCheck.message});
    });
    apiRoutes.post(`/${SERVICE_CONST.NEW_TOKEN}`, function (req, res) {
        let objCheck = tokenVerify(req, res);
        if (objCheck.status === 200) {
            var token = generateNewToken(cryptr.decrypt(req.headers['id']));
            res.status(objCheck.status).json({status: "success", message: 'New token !!', accesstoken: token, userid: req.headers['id']});
        } else {
            res.status(objCheck.status).json({status: objCheck.status, message: objCheck.message});
        }
    });
   /* apiRoutes.post(`/${SERVICE_CONST.IMAGE_UPLOAD}`, (req, res, next) => {
        let imageFile = req.files.file;
        imageFile.mv(`${folderpath}\\${req.body.filename}`, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({file: "images/" + req.body.filename});
        });
    });*/
    
    apiRoutes.get(`/${SERVICE_CONST.GET_CCN_NOTIFICATION}/:id`, (req, res) => {

        let decryptedString = req.params.id;
        Devicefcm.find({'userid': decryptedString}, (error, users) => {
            if (users.length > 0) {
                res.json({status: "success", list: {
                        promotion: users[0]['promotiontype'],
                        coupontype: users[0]['coupontype']
                    }});
            } else {
                res.json({status: "success", message: "No record found!!!!"});
            }
        });
    });
    
    
    
     apiRoutes.post(`/${SERVICE_CONST.USER_DEVICE_FCM}`, function (req, res) {
         
        
        Devicefcm.find({
            'userid': req.body.userId
        }, (error, data) => {

            if (data.length > 0) {
                var obj = {};
                if (req.body.subtype === 'P') {
                    obj.promotiontype = req.body.status;
                } else {
                    obj.coupontype = req.body.status;
                }

                Devicefcm.update(
                        {'userid': req.body.userId},
                        {
                            $addToSet: {token: req.body.token},
                            $set: obj
                        }, (data) => {
                    res.json({status: "200", message: "Subscribe Updtaed Scucessfully!!"});
                });
            } else {
                var obj = {};
                if (req.body.subtype === 'P') {
                    obj.promotiontype = req.body.status;
                } else {
                    obj.coupontype = req.body.status;
                }
                obj.token = req.body.token;
                obj.userid = req.body.userId;
                new Devicefcm(obj).save().then(() => {
                    res.json({status: "200",data:req, message: "Subscribe Successfully!! !!!!"});
                });
            }
        });
    });
    
     apiRoutes.get(`/${SERVICE_CONST.GET_DEVICE_FCM}`, (req, res) => {
        Devicefcm.find((error, list) => {
            if (list.length > 0) {
                res.json({status: "success", list: list});
            } else {
                res.json({status: "success", message: "No record found!!!!"});
            }
        });
    });
    
    
    
    
    
    
    
     apiRoutes.get(`/${SERVICE_CONST.GET_FCM}`, (req, res) => {
        Fcm.find((error, list) => {
            if (list.length > 0) {
                res.json({status: "success", list: list});
            } else {
                res.json({status: "success", message: "No record found!!!!"});
            }
        });
    });
    
    
    
    apiRoutes.post(`/${SERVICE_CONST.USER_FCM}`, function (req, res) {
        Fcm.find({
            'userid': cryptr.decrypt(req.body.userId)
        }, (error, data) => {

            if (data.length > 0) {
                var obj = {};
                if (req.body.subtype === 'P') {
                    obj.promotiontype = req.body.status;
                } else {
                    obj.coupontype = req.body.status;
                }

                Fcm.update(
                        {'userid': cryptr.decrypt(req.body.userId)},
                        {
                            $addToSet: {token: req.body.token},
                            $set: obj
                        }, (data) => {
                    res.json({status: "200", message: "Subscribe Updtaed Scucessfully!!"});
                });
            } else {
                var obj = {};
                if (req.body.subtype === 'P') {
                    obj.promotiontype = req.body.status;
                } else {
                    obj.coupontype = req.body.status;
                }
                obj.token = req.body.token;
                obj.userid = cryptr.decrypt(req.body.userId);
                new Fcm(obj).save().then(() => {
                    res.json({status: "200", message: "Subscribe Successfully!! !!!!"});
                });
            }
        });
    });


    apiRoutes.post(`/${SERVICE_CONST.GET_STORES}`, function (req, res) {
             var api = 'https://dev3-rs.getiqos.com/AlcsServices/store/getStoreList?BrandName=iqos&Cur_Zip=' + req.body.zipcodes
                + '&Radius=15&storeTypes=MRU&serviceTypes=DeviceSales%2CHeatStickPurchase%2CGuidedTrial%2CSupport&date=' + req.body.time;


        //   var api = arrayApi[Math.floor(Math.random() * arrayApi.length)];
        request.get({
            url: api,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
                'Content-Type': 'application/json; charset=utf-8',
                'Cookie': "testcookie=true; path=/; domain=.getiqos.com; Expires=Tue, 19 Jan 2038 03:14:07 GMT;"
            },
            method: 'get'
        },
                function (e, r, body) {
                    body = JSON.parse(body);
                    if (body.hasOwnProperty('services') && body.services !== null) {
                        if (body.services.hasOwnProperty('StoreList') && body.services.StoreList !== null) {
                            if (body.services.StoreList.hasOwnProperty('data') && body.services.StoreList.data !== null) {
                                if (body.services.StoreList.data.hasOwnProperty('responseData') && body.services.StoreList.data.responseData !== null) {
                                    var detailData = [];
                                    body.services.StoreList.data.responseData.forEach((obj, k) => {
                                        let count = (k + 1);
                                        if (k === 0) {
                                            detailData.push(count + ")." + obj.storeName.replace('�', ' ®') + " (" + obj.addressLine1 + ")");
                                        } else {
                                            detailData.push("\n" + count + ")." + obj.storeName.replace('�', ' ®') + " (" + obj.addressLine1 + ")");
                                        }
                                    });
                                    res.json({status: "200", stores: detailData, message: "Store List Successfully!! !!!!"});
                                } else {
                                     res.json({status: "200", stores: [], message: "No data found Successfully!! !!!!"});
                                }
                            } else {
                                 res.json({status: "200", stores: [], message: "No data found Successfully!! !!!!"});
                            }
                        } else {
                             res.json({status: "200", stores: [], message: "No data found Successfully!! !!!!"});
                        }
                    } else {
                        res.json({status: "200", stores: [], message: "No data found Successfully!! !!!!"});
                    }
                });

    });





    apiRoutes.post(`/${SERVICE_CONST.WHERE_I_AM}`, function (req, res) {

        var latlng = req.body.platlng;
        var api = 'https://dev3-rs.getiqos.com/AlcsServices/store/getStoreList?BrandName=iqos&Cur_Zip=' + req.body.pzipcodes
                + '&Radius=15&storeTypes=MRU&serviceTypes=DeviceSales%2CHeatStickPurchase%2CGuidedTrial%2CSupport&date=' + req.body.time;

        Geo.find({
            'userid': cryptr.decrypt(req.body.userId)
        }, (error, data) => {

            if (data.length > 0) {
                var obj = {};

                obj.plat = latlng.split('--')[0];
                obj.plng = latlng.split('--')[1];
                obj.pzipcodes = req.body.pzipcodes;
                Geo.update(
                        {'userid': cryptr.decrypt(req.body.userId)},
                        {
                            $addToSet: {token: req.body.token},
                            $set: obj
                        }, (data) => {
                    res.json({status: "200", api:api, message: "Upadte my location Scucessfully!!"});
                    getnearbylocation(api, cryptr.decrypt(req.body.userId), "p");

                });
            } else {
                var obj = {};
                obj.plat = latlng.split('--')[0];
                obj.plng = latlng.split('--')[1];
                obj.pzipcodes = req.body.pzipcodes;
                obj.token = req.body.token;
                obj.userid = cryptr.decrypt(req.body.userId);
                new Geo(obj).save().then(() => {
                    res.json({status: "200", message: " Add my location Successfully!! !!!!"});
                    getnearbylocation(api, cryptr.decrypt(req.body.userId), "p");
                });
            }
        });
    });

    apiRoutes.post(`/${SERVICE_CONST.SET_NEW_LOCATION}`, function (req, res) {

        var latlng = req.body.latlng;
        var api = 'https://dev3-rs.getiqos.com/AlcsServices/store/getStoreList?BrandName=iqos&Cur_Zip=' + req.body.zipcodes
                + '&Radius=15&storeTypes=MRU&serviceTypes=DeviceSales%2CHeatStickPurchase%2CGuidedTrial%2CSupport&date=' + req.body.time;
 
        Geo.find({
            'userid': cryptr.decrypt(req.body.userId)
        }, (error, data) => {

            if (data.length > 0) {
                var obj = {};
                obj.sub = true;
                obj.lat = latlng.split('--')[0];
                obj.lng = latlng.split('--')[1];
                obj.zipcodes = req.body.zipcodes;
                Geo.update(
                        {'userid': cryptr.decrypt(req.body.userId)},
                        {
                            $addToSet: {token: req.body.token},
                            $set: obj
                        }, (data) => {
                    res.json({status: "200", message: "Upadte my location Scucessfully!!"});
                    getnearbylocation(api, cryptr.decrypt(req.body.userId), '');

                });
            } else {
                var obj = {};

                obj.sub = true;
                obj.lat = latlng.split('--')[0];
                obj.lng = latlng.split('--')[1];
                obj.zipcodes = req.body.zipcodes;
                obj.token = req.body.token;
                obj.userid = cryptr.decrypt(req.body.userId);
                new Geo(obj).save().then(() => {
                    res.json({status: "200", message: " Add my location Successfully!! !!!!"});
                    getnearbylocation(api, cryptr.decrypt(req.body.userId), '');
                });
            }
        });

    });

    function getnearbylocation(api, id, flag) {
        console.log(api)

        request.get({
            url: api,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
                'Content-Type': 'application/json; charset=utf-8',
                'Cookie': "testcookie=true; path=/; domain=.getiqos.com; Expires=Tue, 19 Jan 2038 03:14:07 GMT;"
            },
            method: 'get'
        },
                function (e, r, body) {

                    body = JSON.parse(body);
                    if (body.hasOwnProperty('services') && body.services !== null) {
                        if (body.services.hasOwnProperty('StoreList') && body.services.StoreList !== null) {
                            if (body.services.StoreList.hasOwnProperty('data') && body.services.StoreList.data !== null) {
                                if (body.services.StoreList.data.hasOwnProperty('responseData') && body.services.StoreList.data.responseData !== null) {
                                    var detailData = [];
                                    body.services.StoreList.data.responseData.forEach((obj, k) => {
                                        let count = (k + 1);
                                        if (k === 0) {
                                            detailData.push(count + ")." + obj.storeName.replace('�', ' ®') + " (" + obj.addressLine1 + ")");
                                        } else {
                                            detailData.push("\n" + count + ")." + obj.storeName.replace('�', ' ®') + " (" + obj.addressLine1 + ")");
                                        }
                                    });


                                    var obj = {};
                                    if (flag === '') {
                                        obj.nearby = detailData;
                                    } else {
                                        obj.pnearby = detailData;
                                    }

                                    Geo.update({'userid': id}, {$set: obj}, (data) => {
                                        console.log(data);
                                    });

                                    // res.json({status: "200", stores: detailData, message: "Store List Successfully!! !!!!"});
                                } else {
                                    console.log("inner");
                                }
                            } else {
                                console.log("inner1");
                            }
                        } else {
                            console.log("inner2");
                        }
                    } else {
                        console.log("inner3");
                    }
                });



        /*
         request(api, function (error, response, body) {
         console.log('error>>>>>>>:', error); // Print the error if one occurred
         //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
         console.log('body:', body.results);
         var detailData = [], body = JSON.parse(body);
         body.results.forEach((obj, k) => {
         let count = (k + 1);
         if (k === 0) {
         detailData.push(count + ")." + obj.name);
         } else {
         detailData.push("\n" + count + ")." + obj.name);
         }
         
         });
         
         var obj = {};
         if (flag === '') {
         obj.nearby = detailData;
         } else {
         obj.pnearby = detailData;
         }
         
         Geo.update({'userid': id}, {$set: obj}, (data) => {
         console.log(data);
         });
         }); */

    }




    apiRoutes.post(`/${SERVICE_CONST.POST_GEO}`, function (req, res) {
        let obj = {};
        obj.sub = 'true';

        Geo.aggregate([
            {"$match": obj},
            {$lookup: {from: 'users', localField: 'userid', foreignField: '_id', as: 'userDetail'}} // FCM+ user
        ]).exec((error, results) => {
            if (error) {
                res.json({status: error});
            }


            if (results.length > 0) {
                var contr = new UserController();
                contr.GeoToSubscriber(req.body, results, function (data) {
                    res.json({status: "success", message: "Notification(s) send to " + data + " Device(s)!"});
                });
            } else {
                res.json({status: "success", message: "No record found!!"});
            }


        });


    });




    apiRoutes.post(`/${SERVICE_CONST.POST_NOTIFICATION}`, function (req, res) {
        let obj = {};
        if (req.body.ptype === 'p') {
            obj.promotiontype = 'sub';
        } else {
            obj.coupontype = 'sub';
        }

        Fcm.aggregate([
            {"$match": obj},
            {$sort: {date: -1}},
            {$lookup: {from: 'users', localField: 'userid', foreignField: '_id', as: 'userDetail'}} // FCM+ user
        ]).exec((error, results) => {
            if (error) {
                res.json({status: error});
            }

            if (results.length > 0) {
                var contr = new UserController();
                contr.postToSubscriber(req.body, results, function (data) {
                    res.json({status: "success", message: "Notification(s) send to " + data + " Device(s)!"});
                });
            } else {
                res.json({status: "success", message: "No record found!!"});
            }

        });

    });
   


    apiRoutes.get(`/${SERVICE_CONST.GET_LOC_DETAIL}/:id`, (req, res) => {

        let decryptedString = cryptr.decrypt(req.params.id);
        Geo.find({'userid': decryptedString}, (error, users) => {
            if (users.length > 0) {
                res.json({status: "success",
                    list: {
                        lat: users[0]['lat'],
                        lng: users[0]['lng'],
                        plat: users[0]['plat'],
                        plng: users[0]['plng'],
                        pzipcodes: users[0]['pzipcodes'],
                        zipcodes: users[0]['zipcodes']
                    }});
            } else {
                res.json({status: "success", list: [], message: "No record found!!!!"});
            }
        });
    });



    apiRoutes.get(`/${SERVICE_CONST.GET_SUB_NOTIFICATION}/:id`, (req, res) => {

        let decryptedString = cryptr.decrypt(req.params.id);
        Fcm.find({'userid': decryptedString}, (error, users) => {
            if (users.length > 0) {
                res.json({status: "success", list: {
                        promotion: users[0]['promotiontype'],
                        coupontype: users[0]['coupontype']
                    }});
            } else {
                res.json({status: "success", message: "No record found!!!!"});
            }
        });
    });
    
    
    
    apiRoutes.post(`/${SERVICE_CONST.NEW_USER}`, function (req, res) {

        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            req.body.password = hash;

            let users = new Users(req.body);
            users.save((err, data) => {
                if (err !== null) {
                    if (err.code === DUPLICATE_CODE) {
                        res.json({statuscode: DUPLICATE_CODE, status: 'error', message: 'Email is already exist'});
                    }
                }
                res.json({statuscode: '200', status: 'success', message: 'Register Sucucessfully '});
            });

        });
    });
    apiRoutes.post(`/${SERVICE_CONST.SIGN_IN}`, function (req, res) {

        Users.find({email: req.body.username}, function (err, userdata) {

            if (userdata.length > 0) {
                bcrypt.compare(req.body.loginpass, userdata[0].password, function (err, flag) {
                    var token = generateNewToken(userdata[0]._id, req);
                    var encryptedString = cryptr.encrypt(userdata[0]._id);
                    if (flag) {
                        res.json({status: "success", message: 'Login Successfully!!', accesstoken: token, userid: encryptedString});
                    } else {
                        res.json({status: "Error", message: 'Invalid Password!!!'});
                    }
                });
            } else {
                res.json({status: "Error", message: 'Invalid Username!!!'});
            }

        });
    });
    apiRoutes.get(`/${SERVICE_CONST.GET_USER_LIST}/:id`, (req, res) => {
        if (req.params.id !== 'null') {
            let decryptedString = cryptr.decrypt(req.params.id);
            Users.find({'_id': {$ne: decryptedString}}, (error, users) => {
                if (users.length > 0) {

                    var contr = new UserController();
                    UsersDetails.find({'userId': {$ne: decryptedString}}, (error, details) => {
                        let list = contr.getuserList(users);
                        let detail = contr.getUserDetails(details);
                        list.forEach((val, i) => {
                            let id = val._id;
                            detail.forEach((dval, k) => {
                                if (id === dval.userId) {
                                    list[i]['userDetail'] = dval;
                                }
                                ;
                            });
                        });
                        res.json({status: "success", list: list});
                    });
                    //  res.json ({status: "success", list: contr.getuserList (users)});

                } else {
                    res.json({status: "success", message: "No record found!!!!"});
                }
            });
        } else {
            res.json({status: "error", message: "Something goes wrong!!!!"});
        }
    });
    apiRoutes.get(`/${SERVICE_CONST.GET_USER_DETAIL}/:id`, (req, res) => {
        if (req.params.id !== 'null') {
            let decryptedString = cryptr.decrypt(req.params.id);
            Users.find({'_id': decryptedString}, (error, users) => {
                if (users.length > 0) {
                    var contr = new UserController();
                    UsersDetails.find({'userId': users[0]._id}, (error, details) => {
                        let list = contr.getuserList(users);
                        let detail = contr.getUserDetails(details);
                        list.forEach((val, i) => {
                            let id = val._id;
                            detail.forEach((dval, k) => {
                                if (id === dval.userId) {
                                    list[i]['userDetail'] = dval;
                                }
                                ;
                            });
                        });
                        res.json({status: "success", list: list});
                    });
                } else {

                    res.json({status: "success", message: "No record found!!!!"});
                }
            });
        } else {
            res.json({status: "error", message: "Something goes wrong!!!!"});
        }
    });
    apiRoutes.post(`/${SERVICE_CONST.USER_UPDATE_DETAIL}`, (req, res) => {

        UsersDetails.find({
            'userId': cryptr.decrypt(req.body.userId)
        }, (error, data) => {
            if (data.length > 0) {

                var obj = {};
                if (req.body.hasOwnProperty('imagedata')) {
                    obj.photodata = req.body.imagedata;
                    obj.isphoto = 'true'
                } else if (req.body.hasOwnProperty('professional')) {
                    obj.professional = req.body.professional;
                } else {
                    obj.aboutme = req.body.aboutme;
                }

                UsersDetails.update(
                        {'userId': cryptr.decrypt(req.body.userId)},
                        obj, {}, (data) => {
                    res.json({status: "success", message: "Image Update Successfully!! !!!!"});
                });
            } else {

                var obj = {};
                if (req.body.hasOwnProperty('imagedata')) {
                    obj.photodata = req.body.imagedata;
                    obj.isphoto = 'true';
                } else if (req.body.hasOwnProperty('professional')) {
                    obj.professional = req.body.professional;
                } else {
                    obj.aboutme = req.body.aboutme;
                }
                obj.userId = cryptr.decrypt(req.body.userId);
                new UsersDetails(obj).save().then(() => {
                    res.json({status: "success", message: "Image upload Successfully!! !!!!"});
                });
                ;
            }
        });
    });
    apiRoutes.post(`/${SERVICE_CONST.UPDATE_USER_DATA}`, (req, res) => {
        Users.find({
            '_id': cryptr.decrypt(req.body.userId)
        }, (error, data) => {
            if (data.length > 0) {

                Users.update(
                        {'_id': cryptr.decrypt(req.body.userId)},
                        {
                            firstName: req.body.formdata.firstName,
                            lastName: req.body.formdata.lastName,
                            city: req.body.formdata.city,
                            country: req.body.formdata.country
                        }, {}, (data) => {

                    res.json({status: "success", message: "Image Update Successfully!! !!!!"});
                });
            }
            ;
        });
    });
};
