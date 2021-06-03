var express = require('express');
var router = express.Router();

var path = require('path');
const createMovieValidation = require('../middlewares/createMovieValidation');
const uploadFile = require('../middlewares/imageMulter')


const mainController = require('../controllers/mainController');
const moviesController = require('../controllers/moviesController');
const charactersController = require('../controllers/charactersController');


router.get('/', mainController.index);
router.get('/createMovie', moviesController.createMovie);
router.post('/newMovie', uploadFile.single('moviePoster'), createMovieValidation, moviesController.newMovie);
router.get('/createCharacter', charactersController.createCharacter);




module.exports = router;
