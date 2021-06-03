var express = require('express');
var router = express.Router();

var path = require('path');
const createMovieValidation = require('../middlewares/createMovieValidation');
const uploadFile = require('../middlewares/imageMulter')


const mainController = require('../controllers/mainController');
const moviesController = require('../controllers/moviesController');


router.get('/', mainController.index);
router.get('/createMovie', moviesController.createMovie);
router.post('/newMovie', uploadFile.single('moviePoster'), createMovieValidation, moviesController.newMovie);




module.exports = router;
