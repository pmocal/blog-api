var passport = require('passport');
var fs = require('fs');
var Photo = require('../models/photo');
var async = require('async');
var path = require('path');
var multer = require('multer');
var upload = multer();


exports.photo_create = [
	passport.authenticate('jwt', { session: false }),
	upload.single("img"),
	(req, res, next) => {
		var photo = new Photo(
			{
				location: req.body.location,
				img: req.file.buffer
			}
		)
		photo.save(function(err) {
			if (err) {
				return next(err)
			}
			res.send({});
		})
	}
]

exports.photo_get = function(req, res, next) {
	Photo.find({location: req.params.locationId})
	    .exec(function (err, obj) {
	    	if (err) { return next(err); }
	    	res.send(obj);
	    })
}