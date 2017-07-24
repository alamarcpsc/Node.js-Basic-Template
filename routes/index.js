// routes/index.js

var express = require('express');
var router = express.Router();
var requestify = require('requestify');

// GET index
router.get('/', function(req, res) {
    minNumber = 1
    if(req.query.min) {
        minNumber = req.query.min
    }
    maxNumber = 100
    if(req.query.max) {
        maxNumber = req.query.max
    }
    requestify.post('https://www.random.org/integers/?num=1&min=' + minNumber + '&max=' + maxNumber + '&col=1&base=10&format=plain&rnd=new', {
    }).then(function(response) {
      res.render('index.ejs', {
        randomNumber : response.getBody(),
        minNumber : minNumber,
        maxNumber : maxNumber
      });
    });
});
// POST index
router.post('/', function(req, res) {
    minNumber = req.body.minNumber
    maxNumber = req.body.maxNumber
    requestify.post('https://www.random.org/integers/?num=1&min=' + minNumber + '&max=' + maxNumber + '&col=1&base=10&format=plain&rnd=new', {
    }).then(function(response) {
      res.render('index.ejs', {
        randomNumber : response.getBody(),
        minNumber : minNumber,
        maxNumber : maxNumber
      });
    });
});

// GET other
router.get('*', function(req, res){
    res.redirect('/');
});

module.exports = router;
