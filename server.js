const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');



 mongoose.connect('mongoDB://localhost:27017/passportfun', {
   useMongoClient: true
 });
 mongoose.Promise = global.Promise


const app = express();


app.use(express.static('public'));



 app.use(session({
   secret: 'aflabajabawikiwoo',
   resave: false,
   saveUninitialized: false
 }));

 app.use(passport.initialize());
 app.use(passport.session());
 require('./passportconfig').configure(passport);



app.use(bodyParser.urlencoded({extended: false}));


 const mustache = mustacheExpress();
 mustache.cache = null;
 app.engine('mustache', mustache);
 app.set('view engine','mustache');

 app.use(require('./routes/general'));
 app.use(require('./routes/auth'));
 app.get('/info', function(req, res){

 });




app.listen(3001, function(){
  console.log('Listening on port 3001.');
});
