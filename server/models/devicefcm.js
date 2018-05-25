const mongoose = require ('mongoose');

const DevicefcmSchema = new mongoose.Schema ({
  token: {type: Array, default:[]},
  devicedetail:{type: String, default: null},
  coupontype: {type: String, default: null},
  promotiontype: {type: String, default: null},
  userid: {type: String,unique: true}
});
 
module.exports = mongoose.model ('Devicefcm', DevicefcmSchema);
