var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true })); //Get data from POST
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

/*
 * Routes
 */
 var router = express.Router(); //Getting router instance from express.

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
