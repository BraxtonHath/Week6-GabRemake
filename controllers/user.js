const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

//render everything to do post messages
module.exports = {
  renderG: function(req, res) {
    var context = {
      sessionName: req.session.username
    };
    res.render('index', context);
  },

  //displays the message
  postG: function(req, res) {
    models.Mailbox.create({
      message: req.body.status,
      user_id: req.session.userId
    }).then(function(newGab) {
      req.session.newGab = newGab.status;
    });
    res.redirect('/');
  }
};
