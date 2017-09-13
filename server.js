//NEXT tutorial: https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer.js');
var userController = require('./controllers/user.js');
var passport = require('passport');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var ejs = require('ejs');
var session = require('express-session');
var oauth2Controller = require('./controllers/oauth2');




mongoose.connect('mongodb://localhost:27017/beerlocker');


var app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(passport.initialize());
// Create our Express router
var router = express.Router();
var routeBeer = router.route('/beers');
      routeBeer.post(authController.isAuthenticated,beerController.postBeers);
      routeBeer.get(authController.isAuthenticated,beerController.getBeers);

var route_beer = router.route('/beers/:beer_id')
      route_beer.get(authController.isAuthenticated,beerController.getBeer);
      route_beer.put(authController.isAuthenticated,beerController.putBeer);
      route_beer.delete(authController.isAuthenticated,beerController.deleteBeer);

var userRoute = router.route('/users')
  userRoute.post(userController.postUser)
  userRoute.get(userController.getUser);

var oauth2Router = router.route('/oauth2/authorize')
    oauth2Router.get(authController.isAuthenticated, oauth2Controller.authorization)
    oauth2Router.post(authController.isAuthenticated, oauth2Controller.decision);

  // Create endpoint handlers for oauth2 token
var oauthRouter = router.route('/oauth2/token')
    oauthRouter.post(authController.isClientAuthenticated, oauth2Controller.token);

var clientRoute = router.route('/clients')
    clientRoute.post(authController.isAuthenticated,clientController.postClients);

    app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));



app.use('/api', router);

app.listen(3000);
