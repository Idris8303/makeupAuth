const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');


// connect to mongoDB instance
 mongoose.connect('mongoDB://localhost:27017/passportfun', {
   useMongoClient: true
 });
 mongoose.Promise = global.Promise


const app = express();

// set up for static file use
app.use(express.static('public'));


// session
 app.use(session({
   secret: 'aflabajabawikiwoo',
   resave: false,
   saveUninitialized: false
 }));
// passport
 app.use(passport.initialize());
 app.use(passport.session());
 require('./passportconfig').configure(passport);


// body-parser setup
app.use(bodyParser.urlencoded({extended: false}));

// mustache setup
 const mustache = mustacheExpress();
 mustache.cache = null;
 app.engine('mustache', mustache);
 app.set('view engine','mustache');

 app.use(require('./routes/general'));
 app.use(require('./routes/auth'));




app.listen(3001, function(){
  console.log('Listening on port 3001.');
});
