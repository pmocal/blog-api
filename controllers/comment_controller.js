var Comment = require('../models/comment');
var Post = require('../models/post');
var async = require('async');

exports.index = function(req, res) {
	Comment.find({post: })
	    .exec(function (err, posts) {
	    	if (err) { return next(err); }
	    	res.send(posts);
	    })
}

exports.comment_create = function(req, res) {
	// Validate fields.
	body('postId', 'PostID must not be empty').isLength({ min: 1 }).trim(),
	body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
	body('timestamp', 'Timestamp must not be empty.').isLength({ min: 1 }).trim(),
	body('text', 'Text must not be empty.').isLength({ min: 1 }).trim(),
	body('link', 'Link must not be empty').isLength({ min: 1 }).trim(),

	// Sanitize fields (using wildcard).
	sanitizeBody('postId').escape(),
	sanitizeBody('title').escape(),
	sanitizeBody('timestamp').escape(),
	sanitizeBody('text').escape(),
	sanitizeBody('link').escape(),

	(req, res, next) => {

		const errors = validationResult(req);

		var post = new Post(
		{
			title: req.body.title,
			timestamp: req.body.timestamp,
			text: req.body.text,
			link: req.body.link
		});

		if (!errors.isEmpty()) {
			res.send('try again with valid parameters')
		} else {
			post.save(function(err) {
				if (err) {
					next(err)
				}
				res.redirect(post.url)
			})
		}
	}
}

exports.comment_get = function(req, res) {
	Post.findById(req.params.id)
	    .exec(function(err, post){
	    	if (err) {
	    		return next(err);
	    	}
	    	res.send(post);
	    })
}

exports.comment_delete = function(req, res) {
	Post.findByIdAndRemove(req.params.id)
		.exec(function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/post')
		})
}