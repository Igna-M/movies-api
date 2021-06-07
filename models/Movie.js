const path = require('path');
const fs = require('fs');

const dbMoviesPath = path.resolve(__dirname, '../data/movies.json');
const moviesInDB = () => JSON.parse(fs.readFileSync(dbMoviesPath, 'utf-8'));

const Movie = {

	findAll: function () {
		return moviesInDB();
	},

	findByPk: function (id) {
		let movieFound = this.findAll().find(oneMovie => oneMovie.id == id);
		return movieFound;
	},

	findByField: function (field, text) {
		let allMovies = this.findAll();
		let movieFound = allMovies.find(oneMovie => oneMovie[field] == text);
		return movieFound;
	},

	create: function (newMovie) {
		let allMovies = this.findAll();
	
		let searchMovie = this.findByField('title', newMovie.title) // First, we check if the movie already exists.
		if (searchMovie == undefined) {

			allMovies.push(newMovie);
			let uploadMovies = JSON.stringify(allMovies, null , 2);
			fs.writeFileSync(dbMoviesPath, uploadMovies)

			// return 'New movie created'

		} else {
			let filePath = path.resolve(__dirname,'../public/images/movies/' + newMovie.moviePoster);
			fs.unlinkSync(filePath);			
			// return 'Movie already exists'
		}	
	},

	deleteImage: function (image) {
		let imagePath = path.resolve(__dirname,'../public/images/movies/' + image);
		fs.unlinkSync(imagePath);
	},

	updateDB: function (array) {
		let uploadMovies = JSON.stringify(array, null , 2);
			fs.writeFileSync(dbMoviesPath, uploadMovies)
	},

	replace: function (updatedMovie) {
		let movies = this.findAll()
		let newMoviesDB = movies.map(function(movie){

            if (movie.id == updatedMovie.id){
                movie = updatedMovie
            }
            return movie
        })
		this.updateDB(newMoviesDB)
	},



}

module.exports = Movie;