var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    text: {type: String, required: true, max: 100},
    timestamp: {type: Date, default: Date.now},
    author: {type: String, required: true, max: 100},
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, //reference to the associated post
  }
);

// Virtual for comment's URL
CommentSchema
.virtual('url')
.get(function () {
  return '/posts/' + this.post._id + '/comment/' + this._id;
});

CommentSchema
.virtual('timestamp_formatted')
.get(function() {
  return moment(this.timestamp).format('MMMM Do YYYY, h:mm a');
})

//Export model
module.exports = mongoose.model('Comment', CommentSchema);