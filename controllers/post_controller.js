var Comment = require('../models/comment');
var passport = require('passport');
var Post = require('../models/post');
var async = require('async');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.index = function(req, res) {
	Post.find({})
	    .exec(function (err, posts) {
	    	if (err) { return next(err); }
	    	res.set('Access-Control-Allow-Origin', '*')
	    	res.send(posts);
	    })
}

exports.post_create = [
	passport.authenticate('jwt', {session: false}),
	// Validate fields.
	body('title', 'Title must not be empty.').isLength({ min: 1 }).trim(),
	body('text', 'Text must not be empty.').isLength({ min: 1 }).trim(),
	body('link').trim(),

	// Sanitize fields (using wildcard).
	sanitizeBody('title'),
	sanitizeBody('text'),
	sanitizeBody('link'),

	// Sanitize fields (using wildcard).
	(req, res, next) => {
		const errors = validationResult(req);
		var post = new Post(
		{
			title: req.body.title,
			text: req.body.text,
			link: req.body.link,
			timestamp: req.body.timestamp
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
]

exports.post_get = function(req, res, next) {
	async.parallel({
		post: function(callback) {
			Post.findById(req.params.postId).exec(callback)
		},
		comments: function(callback) {
			Comment.find({post: req.params.postId}).exec(callback)
		}
	}, function(err, results) {
		if (err) {
    		return next(err);
    	}
    	if (results.post==null) { // No results.
			var err = new Error('Post not found');
			err.status = 404;
			return next(err);
		}
		res.set('Access-Control-Allow-Origin', '*')
    	res.send([ results.post, results.comments ]);
    	
	})
}

exports.post_update = [
	passport.authenticate('jwt', {session: false}),
	(req, res, next) => {
		Post.findById(req.params.postId)
			.exec(function (err, post) {
		    	if (err) { return next(err); }
		    	if (post==null) { // No results.
					var err = new Error('Post not found');
					err.status = 404;
					return next(err);
				}
				post = new Post(
				{
					id: post._id,
					title: req.body.title || post.title,
					text: req.body.text,
					link: req.body.link,
					timestamp: req.body.timestamp || Date.now
				});
			})
	}
]

exports.post_delete = [
	passport.authenticate('jwt', {session: false}),
	(req, res, next) => {
		Comment.deleteMany({post: req.params.postId}, function(err){
			if (err) {
				return next(err);
			}
			Post.findByIdAndRemove(req.params.postId)
				.exec(function(err) {
					if (err) {
						return next(err);
					}
					res.redirect(303, '/posts')
				})
		})
	}
]