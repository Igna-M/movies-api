const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const dbMoviesPath = path.resolve(__dirname, '../data/movies.json');
// const moviesInDB = () => JSON.parse(fs.readFileSync(dbMoviesPath, 'utf-8'));
// const dbCharactersPath = path.resolve(__dirname, '../data/characters.json');
// const charactersInDB = () => JSON.parse(fs.readFileSync(dbCharactersPath, 'utf-8'));
// const dbGenresPath = path.resolve(__dirname, '../data/genres.json');
// const genresInDB = () => JSON.parse(fs.readFileSync(dbGenresPath, 'utf-8'));



const Movies = require('../models/Movie');
const Characters = require('../models/Character');
const Genres = require('../models/Genre');

// const fetch = require("node-fetch");

const moviesController = {

    // Show Form
    createMovie: function(req, res) {
        let message = 'Register a movie'

        // let movies = Movies.findAll()
        let characters = Characters.findAll()
        let genres = Genres.findAll()
        


        let view = {
            // movies: movies,
            message: message,
            genres: genres,
            characters: characters
        }

        // console.log(view);

        return res.render('createMovie', view);
    },


    // Process Form (POST)
    newMovie: function(req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            if (req.file){
                let filePath = path.resolve(__dirname,'../public/images/movies/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let message = 'Sorry, something went wrong. Please, try again.'

            
            let characters = Characters.findAll()
            let genres = Genres.findAll()

            let view = {
                message: message,
                genres: genres,
                characters: characters,
                errors: errors.mapped(),
                originalData: req.body
            }
            return res.render('createMovie', view);
        }
        
        let movies = Movies.findAll()
        let lastElement = movies[movies.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;


        let charactersLis = [req.body.character1, req.body.character2, req.body.character3];
        let selectedCharacters = []
        for (let i = 0; i < charactersLis.length; i++){
            if (charactersLis[i] != '0' && charactersLis[i] != 'new'){
                selectedCharacters.push(Number(charactersLis[i]));
            }
        }
        
        
        let optionsGenres = [req.body.genre1, req.body.genre2, req.body.genre3];
        let newGenres = [req.body.NewGenre1, req.body.NewGenre2, req.body.NewGenre3];

        let selectedGenres = [];
        for (let i = 0; i < optionsGenres.length; i++){
            if (optionsGenres[i] != 'new' && optionsGenres[i] != '0'){
                selectedGenres.push(Number(optionsGenres[i]));
            } else if (optionsGenres[i] == 'new' && newGenres[i] != 'null'){
                newGenreID = Genres.create(newGenres[i])
                // console.log('Crear nuevo género'); // Acá va la función para revisar que el género no existe y agregarlo.
                selectedGenres.push(newGenreID);// Tengo que recibir el nuevo ID del género para agregarlo.
            } 
        }

        let newMovie = {
            id: nextID,
            title: req.body.title,
            score: Number(req.body.score),
            characters: selectedCharacters,
            genres: selectedGenres,
            release: req.body.release,            
            moviePoster: req.file.filename
        }

        movies.push(newMovie);

        let uploadMovies = JSON.stringify(movies, null , 2);
        fs.writeFileSync(dbMoviesPath, uploadMovies)

        return res.redirect('/');

        // return res.send(newMovie)
        // return res.send(req.body)
    },



}

module.exports = moviesController