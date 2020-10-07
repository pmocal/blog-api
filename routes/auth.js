const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', function (req, res, next) {
	passport.authenticate('local', {session: false},
		(err, user, info) => {
			if (err || !user) {
				return res.status(400).json({
					message: err,
					user: user,
					info: info
				})
			}

			req.login(user, {session: false}, (err) => {

				if (err) {
					next(err);
				}

				// generate signed json web token with
				// contents of user object and
				// return it in the response

				const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
				res.cookie('token', token);
				res.cookie('SameSite', 'None');
				res.cookie('Secure');
				res.redirect('/posts');
			});
		}
	)(req, res);
});

module.exports = router;