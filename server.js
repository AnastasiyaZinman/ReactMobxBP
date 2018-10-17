const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const expressJwt = require('express-jwt');

const checkIfAuthenticated = expressJwt({
    secret: 'thisIsTopSecret'
}); 


var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '308803943270602',
    clientSecret: '2ee249816e464c3a73c91e9292beb1b9',
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, done) {
    let megaObj = {
      accessToken:accessToken,
      refreshToken:refreshToken,
      profile:profile,
      done:done
    }
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
      done(null, megaObj);
    // });
  }
));


app.get('/userDetails', function (req, res){
  res.send(req.megaObj);
  console.log(req)
});
// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));



// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/sucess',
                                      failureRedirect: '/login' }));

let DummyData = [{name:'Burger'},{name:'Pizza'},{name:'Sushi'},]

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.get('/foodApi', (req, res) => res.json(DummyData))


if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
  
app.listen(port, () => console.log(`Example app listening on port ${port}!`))