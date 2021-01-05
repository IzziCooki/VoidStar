let express = require('express'),
    app = express(),
    passport = require('passport'),
    session = require('express-session');
let GithubStrategy = require('passport-github').Strategy;

/***************************************************************
 *********** Github Configuration setup...
 ***************************************************************/

passport.use(new GithubStrategy({
    clientID: "9c74caecec9d503e6453",
    clientSecret: "4a3c4c676b8b6d8fb5abb37e8c357690ee368ff8",
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // we will just use the profile object returned by GitHub
    return done(null, profile);
  }
));

// Express and Passport Session
app.use(session({secret: "randomletterthatiamtypingrightnow"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are getoing to get the user from mongo by id?

    done(null, user); // null is for errors
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
      res.redirect('/');
  });

app.get('/logout', function (req, res) {
    var html = "<ul>\
      <li><a href='/auth/github'>GitHub</a></li>\
      <li><a href='/logout'>logout</a></li>\
    </ul>";

    // data fetched from github server
    if (req.isAuthenticated()) {
      html += "<p>authenticated as user:</p>"
      html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
    }

    res.send(html);
});


// Simple route middleware to ensure user is authenticated.
//  Use this route middleware on any resource that needs to be protected.  If
//  the request is authenticated (typically via a persistent login session),
//  the request will proceed.  Otherwise, the user will be redirected to the login page.

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/dashboard')
}


app.listen(8000, function () {
    console.log('App listening at port: 8000');
});
