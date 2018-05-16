const mongoose = require ('mongoose');

const GeoSchema = new mongoose.Schema ({
  token: {type: Array, default:[]},
  lat: {type: String, default: null},
  lng: {type: String, default: null},    
  sub: {type: String, default: null},   
  imgurl:{type: String, default: null},
  nearby:{type: Array, default: []},
  userid: {type: mongoose.Schema.Types.ObjectId,unique: true}
});
 
module.exports = mongoose.model ('Geo', GeoSchema);
