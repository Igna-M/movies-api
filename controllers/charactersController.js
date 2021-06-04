const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// const dbMoviesPath = path.resolve(__dirname, '../data/movies.json');
// const moviesInDB = () => JSON.parse(fs.readFileSync(dbMoviesPath, 'utf-8'));
// const dbCharactersPath = path.resolve(__dirname, '../data/characters.json');
// const charactersInDB = () => JSON.parse(fs.readFileSync(dbCharactersPath, 'utf-8'));
// const dbGenresPath = path.resolve(__dirname, '../data/genres.json');
// const genresInDB = () => JSON.parse(fs.readFileSync(dbGenresPath, 'utf-8'));

const Movies = require('../models/Movie');
const Characters = require('../models/Character');
const Genres = require('../models/Genre');

// const fetch = require("node-fetch");

const charactersController = {

    createCharacter: function(req, res) {
        let message = 'Register a character'

        let movies = Movies.findAll()

        let view = {
            movies: movies,
            message: message,
        }

        return res.render('createCharacter', view);
    },

    newCharacter: function(req, res) {
        const errors = validationResult(req);
        
        console.log(req.body);
        console.log(errors);
        
        if (!errors.isEmpty()) {
            if (req.file){
                let filePath = path.resolve(__dirname,'../public/images/characters/' + req.file.filename);
                fs.unlinkSync(filePath);
            }

            let message = 'Sorry, something went wrong. Please, try again.'
            let movies = Movies.findAll()
            let view = {
                message: message,
                movies: movies,
                errors: errors.mapped(),
                originalData: req.body
            }
            return res.render('createCharacter', view);
        }
        
        let characters = Characters.findAll()
        let lastElement = characters[characters.length -1];
        let lastID = lastElement.id;
        let nextID = lastID + 1;

        let roughMovies = [req.body.movie1, req.body.movie2, req.body.movie3, req.body.movie4, req.body.movie5]
        let charactersMovies = []

        for (let i = 0; i < roughMovies.length ; i++){
            if (roughMovies[i] != 0 && roughMovies[i] != 'null' && roughMovies[i] != 'new'){
                charactersMovies.push(Number(roughMovies[i]))   
            }
        }
        
        let newCharacter = {
            id: nextID,
            name: req.body.name,
            age: Number(req.body.age),
            weight: Number(req.body.weight),
            story: req.body.story,
            movies: charactersMovies,
            characterImage: req.file.filename
        }

        Characters.create(newCharacter)
        
        return res.redirect('/')
    },
}

module.exports = charactersController