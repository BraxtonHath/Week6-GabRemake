const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

//should likes and post
module.exports = {
  renderI: function(req, res) {
    models.Mailbox.findAll({
      include: [
        {
          model: models.user,
          as: 'users'
        } ,
        {
          model: models.Like,
          as: 'likes'
        }
      ]
    }).then(function(gabpost){
      var context = {
        // model: Mailbox,
        sessionName: req.session.username,
        numberLikes: function() {
          models.Like.findAll(
            { where: {gab_id: req.body.id} }
          ).then (function(likes) {
            var numbLikes = likes.length;
            // console.log(numbLikes);
            return numbLikes;
          });
        }
      };
      res.render('index', context);
    });
  },

   //creates the likes on the table
  likeClick: function(req, res) {
    models.Like.create({
      user_id: req.session.userId,
      gab_id: req.params.id
    }).then(function(likepost) {
      res.redirect('/');
    });

  },

  //should delete a post
  deleteG: function(req, res) {
    models.Like.destroy({
      where: { gab_id: req.params.id}
    }).then(function(){
      models.Mailbox.destroy(
        {
          where: { id: req.params.id }
        }).then(function() {
          res.redirect('/');
        });
      });
    }
  };
