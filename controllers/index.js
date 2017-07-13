const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');
const Sequelize = require('sequelize');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//should likes and post
module.exports = {
  renderI: function(req, res) {
    var context = {
      loggedIn: true,
      name: req.session.username,
      signedIn: true,
      loggedInUser: req.session.userId,
      modelArray:[]
    };
    models.Mailbox.findAll({
      include: [
        {
          model: models.user,
          as: 'users'
        },
        'userLikes'],
        order: [['createdAt', 'DESC']]
      }).then(function(mailbox){
        context.model = mailbox;

        res.render('index', context);
      });
    },

    //creates the likes on the table
    likeClick: function(req, res) {
      models.Mailbox.findOne(
        {where: {id: req.params.id},
        include: [{
          model: models.user,
          as: 'users'
        }],
      }).then(function(mailbox) {
        Mailbox.othersLikes(req.session.userId);
        res.redirect('/');
      });

    },

    //should delete a post
    deleteG: function(req, res) {
      models.Mailbox.destroy(
        {
          where: {
            id: req.params.id,
            user_id: req.session.userId
          }
        }).then(function() {
          res.redirect('/');
        });
      }
    };
