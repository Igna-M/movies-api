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
        // let characters = Characters.findAll()
        // let genres = Genres.findAll()
        


        let view = {
            movies: movies,
            message: message,
            // genres: genres,
            // characters: characters
        }

        return res.render('createCharacter', view);
    },

}

module.exports = charactersController