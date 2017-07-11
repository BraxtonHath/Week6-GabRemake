const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

//everything to do with login
module.exports = {
  renderLog: function(req, res) {
    req.session.userId = '';
    req.session.username = '';
    res.render('login', {});
  },

  //should add Username and password to the DB
   signup: function(req, res) {
    models.user.create({
      username: req.body.username,
      password: req.body.password,
    }).then(function(newUser) {
      req.session.username = newUser.username;
      req.session.userId = newUser.id;
       console.log('signup username', req.session.username);
       console.log('signup id', req.session.userId);
      res.redirect('/');
    });
  },

  //should look at the DB and check if the info matches
   signin: function(req, res) {
    var signin_username = req.body.username;
    var signin_password = req.body.password;
    models.user.findOne(
      {where: {
        username: signin_username,
        password: signin_password
      }
    }).then(function(user) {
      req.session.username = user.username;
      req.session.userId = user.id;
      //  console.log('sign in', req.session.username);
      res.redirect('/');
    });
  }
};
