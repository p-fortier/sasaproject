var express = require('express');
var router = express.Router();

var test = require('../headergenerator');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lulu and Patoche' });
});

router.get('/yo', test.test);
router.get('/headers', test.getHeaders);
router.get('/allheaders', test.getAllHeaders);
router.get('/getselectedheaders/:n', test.getSelectedHeaders);
router.post('/association/:n', test.association);
router.post('/headers', test.printBody);
module.exports = router;
