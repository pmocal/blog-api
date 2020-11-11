var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhotoSchema = new Schema(
  {
    img: { type: Buffer },
    location: {type: String, max: 100}
  }
);

//Export model
module.exports = mongoose.model('Photo', PhotoSchema);