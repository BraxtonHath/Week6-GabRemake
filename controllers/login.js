const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');
const Sequelize = require('sequelize');

//everything to do with login
module.exports = {
  renderLog: function(req, res) {
    req.session.userId = '';
    req.session.username = '';
    res.render('login', {});
  },

  //should add Username and password to the DB
  signup: function(req, res) {
    if (req.body.username && req.body.password) {
      models.user.create({
        username: req.body.username,
        password: req.body.password
      }).then(function(newUser) {
        req.session.username = newUser.username;
        req.session.userId = newUser.id;
        res.redirect('/');
      }).catch(Sequelize.UniqueConstraintError, function(error) {
        var context= {
          msg: error.message
        };
        res.render('login', context);
      }).catch(Sequelize.ValidationError, function(error) {
        var context = {
          msg: error.message
        };
        res.render('login', context);
      });
    } else if (!req.body.username || !req.body.password) {
      var context = {
        msg: 'not in DB'
      };
      res.render('login', context);
    }
  },
  signin: function(req, res) {
    if (req.body.username && req.body.password) {
      var signin_username = req.body.username;
      var signin_password = req.body.password;
      models.user.findOne(
        {where: {
          username: signin_username
        }
      }).then(function(user) {
        req.session.username = user.username;
        req.session.userId = user.id;
        res.redirect('/');
      });
    } else if (!req.body.username || !req.body.password) {
      var context = {
        msg: 'not in DB1'
      };
      res.render('login', context);
    }
  }
};
