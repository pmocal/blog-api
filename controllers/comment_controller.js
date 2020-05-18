var Comment = require('../models/comment');
var Post = require('../models/post');
var passport = require('passport')
var async = require('async');

exports.index = function(req, res) {
	Comment.find({post: req.params.postId})
	    .exec(function (err, comments) {
	    	if (err) { return next(err); }
	    	res.send(comments);
	    })
}

exports.comment_create = function(req, res) {
	// Validate fields.
	body('author', 'Title must not be empty.').isLength({ min: 1 }).trim(),
	body('timestamp', 'Timestamp must not be empty.').isLength({ min: 1 }).trim(),
	body('text', 'Text must not be empty.').isLength({ min: 1 }).trim(),

	// Sanitize fields (using wildcard).
	sanitizeBody('author').escape(),
	sanitizeBody('timestamp').escape(),
	sanitizeBody('text').escape(),

	(req, res, next) => {

		const errors = validationResult(req);

		var comment = new Comment(
		{
			timestamp: req.body.timestamp,
			text: req.body.text,
			author: req.body.author,
			post: req.params.postId
		});

		if (!errors.isEmpty()) {
			res.send('try again with valid parameters')
		} else {
			comment.save(function(err) {
				if (err) {
					next(err)
				}
				res.redirect(comment.url)
			})
		}
	}
}

exports.comment_get = function(req, res) {
	Comment.findById(req.params.commentId)
	    .exec(function(err, comment){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.send(comment);
	    })
}

exports.comment_delete = [
	passport.authenticate('jwt', {session: false}), 
	function(req, res) {
		Comment.findByIdAndRemove(req.params.commentId)
			.exec(function(err) {
				if (err) {
					return next(err);
				}
				res.redirect('/posts/' + req.params.postId + '/comments/')
			})
	}
]