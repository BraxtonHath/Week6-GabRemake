const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');
const Sequelize = require('sequelize');

//render everything to do post messages
module.exports = {
  renderG: function(req, res) {
    var context = {
      sessionName: req.session.username
    };
    res.render('gabpost', context);
  },

  //displays the message
  postG: function(req, res) {
    models.Mailbox.create({
      message: req.body.message,
      // user_id: req.session.userId
    }).then(function(newPost) {
      // req.session.message = newPost.message;
      // req.session.userId = newPost.id;
      res.redirect('/');
    });
  }
};
