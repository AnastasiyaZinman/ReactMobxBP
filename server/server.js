const express = require('express')
const bodyParser = require('body-parser') 
// const expressSession = require('express-session');

const passport = require('./passport');
const app = express()
const PORT = 5000
const user = require('./routes/user')


//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Passport and session
// app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));

app.use(passport.initialize())
// app.use(passport.session()) 

app.use('/user', user)

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
