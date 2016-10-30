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

router.route('/bears')
  //Create a new bear route
  .post(function(req, res) {
    var bear = new Bear(); //Create new bear instance.
    bear.name = req.body.name; //Set name field from request body.

    //Save bear
    bear.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'The bear has been created!'});
    });
  })

  //Getting all the bears in db
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) {
        res.send(err);
      }

      res.json(bears);
    });
  });

router.route('/bears/:bear_id')
  //Get bear by id
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {
        res.send(err);
      }

      res.json(bear);
    })
  })

  //Update bear info
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {
        res.send(err);
      }

      bear.name = req.body.name;

      bear.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({ message: 'Bear updated!' });
      });
    });
  })

  //Deleting a bear
  .delete(function(req, res) {
    Bear.remove({
      _id: req.params.bear_id
    }, function(err, bear) {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Successfully deleted!'});
    });
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
