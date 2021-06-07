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
const Character = require('../models/Character');
const Movie = require('../models/Movie');

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
            if (roughMovies[i] != 'null' && roughMovies[i] != 'new'){
                charactersMovies.push(Number(roughMovies[i]))
            } else {
                charactersMovies.push(Number(0))
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


    charactersList: function(req, res) {
        
        let movies = Movies.findAll()
        let characters = Characters.findAll()
        let genres = Genres.findAll()

        let message = 'Characters` list'

        let view = {
            movies: movies,
            characters: characters,
            genres: genres,
            message: message
        }


        return res.render('charactersList', view)
    },


    deleteCharacter: function(req, res) {

        let deleteID = req.body.delete;
        let characterToDelete = Character.findByPk(deleteID)
        let newList = Character.findAll().filter(character => character.id != deleteID);

        // Delete characters appearence on movies.
        let moviesInCharacter = Movies.findAll().filter(movie => movie.characters.some((character) => character == deleteID));

        // change in characters with deleted movie
        for (let i = 0; i < moviesInCharacter.length; i++){
            charactersNow = moviesInCharacter[i].characters.filter((movie) => movie != deleteID)
            moviesInCharacter[i].characters = charactersNow
        }

        // Modify complete list, replacing characters
        let movies = Movies.findAll()

        for (let i = 0; i < moviesInCharacter.length; i++){

            movies = movies.map(function(movie){
                if (movie.id == moviesInCharacter[i].id){
                    // console.log("Pre", movie);
                    movie = moviesInCharacter[i]
                    // console.log("Pos", movie);
                };
                // console.log("All:", movie);
                return movie
            })
        }

        Movies.updateDB(movies)
        Characters.updateDB(newList)
        
        // Delete moviePoster
        if (movieToDelete.moviePoster){
            Character.deleteImage(characterToDelete.characterImage)
        }
        
        // return res.send(view)
        return res.redirect('/charactersList')

    },


    editCharacter: function(req, res) {

        let character = Characters.findByPk(req.params.id)
        let message = 'Edit character'

        let movies = Movies.findAll()
        // let characters = Characters.findAll()
        // let genres = Genres.findAll()

        let view = {
            character: character,
            movies: movies,
            message: message
        }

        return res.render('editCharacter', view)
    },


    updateCharacter: function(req,res) {

        let character = Character.findByPk(req.body.id)
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            if (req.file){
                console.log('Image deleted');                
                Character.deleteImage(req.file.filename)
            }

            let message = 'Sorry, something went wrong. Please, try again.'

            let movies = Movie.findAll()

            let view = {
                movies: movies,
                message: message,
                character: character,
                errors: errors.mapped(),
                originalData: req.body
            }
            return res.render('editCharacter', view);
        }


        let newMovies = [Number(req.body.movie1), Number(req.body.movie2),Number(req.body.movie3),Number(req.body.movie4),Number(req.body.movie5)]
        
        let imageInEditedCharacter = character.characterImage
        if (req.file){
            imageInEditedCharacter = req.file.filename
            Character.deleteImage(character.characterImage)
        } 
        
        let updatedCharacter = {
            id: Number(req.body.id),
            name: req.body.name,
            age: Number(req.body.age),
            weight: Number(req.body.weight),
            story: req.body.story,
            movies: newMovies,
            characterImage: imageInEditedCharacter
        }

        Character.replace(updatedCharacter)

        return res.redirect('CharactersList')
    }
}

module.exports = charactersController