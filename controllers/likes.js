const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');


//should render everything to do with the likes
module.exports = {
  renderL: function(req, res) {
    res.render('likes', {});
  },
  renderGL: function(req, res) {
    var context = {};
    for (var i = 0; i < models.Mailbox.length; i) {
      context = models.Mailbox[i];
      if (models.Mailbox.id == req.params.id) {
        break;
      }
    }
    res.render('likes', context);
  }
};
