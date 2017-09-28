const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) =>{
  res.render('index');
});

function authRequired(req, res, next){
  if (req.user) {
    next();
  }
  else {
    res.redirect('/login');
  }
}


router.get('/home', authRequired, (req, res) =>{
  User.find({})
.then(function(data){
  res.render('home', {users: data});
})
.catch(function(err){
  res.redirect('/');
  });
});



module.exports = router;
