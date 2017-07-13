const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('./models');
const Sequelize = require('sequelize');

const loginCon = require('./controllers/login.js');
const userCon = require('./controllers/user.js');
const indexCon = require('./controllers/index.js');
const likeCon = require('./controllers/likes.js');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({
  additionalValidators: 'equals'
}));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// sends back to login
var failedLogin = function(req, res, next) {
  var pathname = parseurl(req).pathname;
  if (!req.session.username && pathname != '/login') {
    res.redirect('/login');
  } else {
    next();
  }
};

// home page
app.get('/', failedLogin, indexCon.renderI);

//sends to login page
app.get('/login', loginCon.renderLog);

// create page
app.get('/gabpost', failedLogin, userCon.renderG);

//like page
app.get('/like/:id', failedLogin, likeCon.showLikes);

// sign up
app.post('/signup', loginCon.signup);

// sign in
app.post('/signin', loginCon.signin);

// gab
app.post('/gabpost', failedLogin, userCon.postG);

//delete
app.post('/delete/:id', failedLogin, indexCon.deleteG);

// post/like gab
app.post('/:id', failedLogin, indexCon.likeClick);

app.listen(3000, function(){
  console.log('Successfully initiated express application');
});
