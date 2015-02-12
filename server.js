var express = require('express');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var GitHubStrategy = require('passport-github').Strategy;
var GitHubApi = require('github');
var port = 8080;

var app = express();

var github = new GitHubApi({
    version: "3.0.0"
   });

passport.use(new GitHubStrategy({
	clientID: 'f5268b8ce9c605038969',
	clientSecret: 'ff9314e4e65083914bcc7cec7e6374d79cbab6f1',
	callbackURL: 'http://localhost:8080/auth/github/callback'
}, function(token, tokenSecret, profile, done) {
	done(null, profile)
}))

app.use(express.static(__dirname+'/public'));
app.use(session({secret: '$uper$secretKey$'}))
app.use(passport.initialize());
app.use(passport.session());

var isAuthed = function (req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}

passport.serializeUser(function(user, done) {
	done(null, user)
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {
	successRedirect: '/#/home',
	failureRedirect: '/'
}))

app.get('/api/github/following', isAuthed, function(req, res) {
	github.user.getFollowingFromUser({
    user: req.user.username
	}, function(err, response) {
		console.log(JSON.stringify(response));
    res.send(JSON.stringify(response));
		});
})


app.listen(port, function () {
	console.log('Now listening on port ' + port)
});