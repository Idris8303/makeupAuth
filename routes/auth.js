const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/login', (req,res) =>{
  res.render('login');
});

router.post('/login', passport.authenticate('local',{
  successRedirect: '/home',
  failureRedirect: '/login'
}));


router.get('/register', (req, res) =>{
  res.render('register');
});

router.post('/register', (req, res) =>{
  console.log('body',req.body);

  const user = new User({ username: req.body.username, password: req.body.password, title: req.body.title, yearsOfEmployment: req.body.yearsOfEmployment, comment: req.body.comment});
  user.save((err) =>{
    if (err) {
      console.log('There was an error saving the user.',err);
    }
    res.redirect('/home');
  });

},passport.authenticate('local',{
  successfulRedirect: '/home'
}));

router.get('/logout',(req, res) =>{
  req.logout();
  res.redirect('/login');
});

module.exports = router;
