var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/profile', function(req, res, next) {
  if ( !req.session.userId ) {
    var err = new Error("Please sign in");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('profile', { email: user.email });
      }
    });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tripcents Auth App' });
});

router.get('/signin', function(req, res, next) {
  return res.render('signin', {title: 'Sign In'})
});

router.post('/signin', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error("I'm sorry, we can't find a profile for that email and password");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Please enter an email and a password');
    err.status = 401;
    return next(err);
  }
});

router.get('/signup', function(req,res,next) {
  return res.render('signup', {title: 'Sign Up'});
});

router.post('/signup', function(req, res, next) {
  if (req.body.email &&
    req.body.password) {

      var userData = {
        email: req.body.email,
        password: req.body.password
      };

      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          req.session.userId = user._id;
          return res.redirect('/profile');
        }
      });
  } else {
    var err = new Error('Please enter an email and a password');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
