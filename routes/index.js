var express = require('express');
var router = express.Router();

var path = require('path');
const createMovieValidation = require('../middlewares/createMovieValidation');
const uploadMovieImage = require('../middlewares/moviesMulter')

const createCharacterValidation = require('../middlewares/createCharacterValidation');
const uploadCharacterImage = require('../middlewares/charactersMulter')


const mainController = require('../controllers/mainController');
const moviesController = require('../controllers/moviesController');
const charactersController = require('../controllers/charactersController');


router.get('/', mainController.index);
router.get('/createMovie', moviesController.createMovie);
router.post('/newMovie', uploadMovieImage.single('moviePoster'), createMovieValidation, moviesController.newMovie);
router.get('/createCharacter', charactersController.createCharacter);
router.post('/newCharacter', uploadCharacterImage.single('characterImage'), createCharacterValidation, charactersController.newCharacter);



module.exports = router;
