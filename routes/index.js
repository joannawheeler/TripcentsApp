var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwtAuth = require('../middleware/jwt_auth');

router.post('/profile', jwtAuth, function(req, res, next) {

    res.status(200).json({
      hi: "you are authorized to see this page",
    });
});

router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'It works'
  });
});

router.get('/signin', function(req, res, next) {
  res.status(200).json({
    message: 'sign in page'
  });
});

router.post('/signin', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user, token) {
      if (error || !user) {
        var err = new Error("I'm sorry, we can't find a profile for that email and password");
        err.status = 401;
        return next(err);
      } else {
        res.header('authorization', "Bearer " + token);
        res.status(200).json({
          email: req.body.email,
          password: req.body.password,
          user: user,
          token: token
        });
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
    User.find({ email: req.body.email })
    .exec()
    .then(function(user) {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "An account with that email already exists. Please sign in."
        });
      } else {
        var userData = {
          email: req.body.email,
          password: req.body.password
        };

        User.create(userData, function (error, user) {
          if (error) {
            res.status(500);
            return next(err);
          } else {
            res.status(201).json({
              message: "user created"
            });
          }
        });
      }
    });
});

module.exports = router;
