const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const UserModel = require('./models/user');
var mongoose = require('mongoose');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'username',
			passwordField: 'password'
		},
		function (username, password, cb) {
			return UserModel.findOne({username, password})
				.then(user => {
					if (!user) {
						return cb(null, false, { message: 'Incorrect username or password.' });
					}
					return cb(null, user, {message: 'Logged In Successfully'});
				})
				.catch(err => {
					cb(err);
				});
		}
));

var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    
    return token;
};
opts.secretOrKey = 'your_jwt_secret';

passport.use(new JWTStrategy(opts, function (jwt_payload, done) {
	try {
		UserModel.findOne({_id: jwt_payload._id}, function(err, user) {
			if (err) {
				done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
				// or you could create a new account
			}
		});
	} catch(err) {
		done(err);
	}
}));