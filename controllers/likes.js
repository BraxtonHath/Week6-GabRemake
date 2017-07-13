const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');
const Sequelize = require('sequelize');


//should render everything to do with the likes
module.exports = {
  renderL: function(req, res) {
    res.render('likes', {});
  },
  showLikes: function(req, res) {
    models.Mailbox.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.user,
        as: 'users'
      }]
    }).then(function(mailbox) {
      Mailbox.getuserLikes().then(function(result) {
        var context = {
          model: mailboxes,
          name: req.session.name,
          loggedIn: true,
          signedIn: true,
          likes: []
        };
        for (var i = 0; i < result.length; i++) {
          context.likes.push(result[i].username);
        }
        res.render('likes', context);
      });
    });
  }
};
