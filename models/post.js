var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    timestamp: {type: Date, default: Date.now},
    text: {type: String, required: true, max: 100},
    link: {type: String, max: 100},
  }
);

// Virtual for post's URL
PostSchema
.virtual('url')
.get(function () {
  return '/posts/' + this._id;
});

PostSchema
.virtual('timestamp_formatted')
.get(function() {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm a');
})

//Export model
module.exports = mongoose.model('Post', PostSchema);