var Comment = require('../models/comment');
var Post = require('../models/post');
var async = require('async');

exports.index = function(req, res) {
	Comment.find()
}

exports.comment_create = function(req, res) {
	res.send()
}

exports.comment_get = function(req, res) {
	res.send()
}

exports.comment_delete = function(req, res) {
	res.send()
}