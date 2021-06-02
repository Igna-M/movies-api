var express = require('express');
var router = express.Router();

const mainController = require('../controllers/mainController');
const moviesController = require('../controllers/moviesController');


router.get('/', mainController.index);
router.get('/createMovie', moviesController.createMovie);
router.post('/newMovie', moviesController.newMovie);




module.exports = router;
