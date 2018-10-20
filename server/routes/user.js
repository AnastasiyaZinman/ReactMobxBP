const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
const passport = require('../passport')


const expressJwt = require('express-jwt');

const checkIfAuthenticated = expressJwt({
    secret: 'thisIsTopSecret'
}); 

router.post('/login', passport.authenticate('local', { 
    session: false
  }),(req,res)=>{
      var token = jwt.sign(req.user, 'thisIsTopSecret', { expiresIn: "7d" });
      res.send({token});
});

router.get('/', checkIfAuthenticated,(req, res, next) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router