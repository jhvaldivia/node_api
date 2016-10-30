var express = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear = require('./app/models/bear');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); //Get data from POST
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://node:node@ds031257.mlab.com:31257/jaime-dev'); // connect to our dev database

/*
 * Routes
 */
 var router = express.Router(); //Getting router instance from express.

 //Middelware for all the Routes
 router.use(function(req, res, next) {
   console.log('An API route has been reached.');
   next(); //Go to next route
 });

 router.get('/', function(req, res) {
   res.json({ message: 'Welcome to the home of our REST API.' });
 });


/*
 * Route registration
 */
app.use('/api', router);

/*
 * Start server
 */
app.listen(port, function() {
  console.log('API available on port ' + port);
});
