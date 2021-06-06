var express = require('express');
var router = express.Router();

var path = require('path');
const createMovieValidation = require('../middlewares/createMovieValidation');
const editMovieValidation = require('../middlewares/editMovieValidation');
const uploadMovieImage = require('../middlewares/moviesMulter')

const createCharacterValidation = require('../middlewares/createCharacterValidation');
// const editCharacterValidation = require('../middlewares/editCharacterValidation');
const uploadCharacterImage = require('../middlewares/charactersMulter')


const mainController = require('../controllers/mainController');
const moviesController = require('../controllers/moviesController');
const charactersController = require('../controllers/charactersController');


router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/createMovie', moviesController.createMovie);
router.post('/newMovie', uploadMovieImage.single('moviePoster'), createMovieValidation, moviesController.newMovie);
router.get('/createCharacter', charactersController.createCharacter);
router.post('/newCharacter', uploadCharacterImage.single('characterImage'), createCharacterValidation, charactersController.newCharacter);


router.get('/moviesList', moviesController.moviesList);
router.get('/charactersList', charactersController.charactersList);


router.post('/deleteMovie', moviesController.deleteMovie);
router.get('/editMovie/:id', moviesController.editMovie);
router.post('/updateMovie', uploadMovieImage.single('moviePoster'), editMovieValidation, moviesController.updateMovie);

router.post('/deleteCharacter', charactersController.deleteCharacter);
router.get('/editCharacter/:id', charactersController.editCharacter);



// API
const apiController = require('../controllers/apiControllers/apiController');
router.get('/api/moviesFront', apiController.moviesFront);
router.get('/api/charactersFront', apiController.charactersFront);
router.get('/api/genresFront', apiController.genresFront);



module.exports = router;
