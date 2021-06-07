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

	updateArray: function(array){
		let allMovies = this.findAll()

        for (let i = 0; i < array.length; i++){
            allMovies = allMovies.map(function(movie){
                if (movie.id == array[i].id){
                    movie = array[i]
                }
                return movie
            })
        }
		this.updateDB(allMovies)
	},

	// update characters array when modified from movie
	characterUpdated: function (characterID, dbArray, newArray) {
		let movies = this.findAll()

		// All movies to be modified
		let superArray = dbArray.concat(newArray.filter(character => !dbArray.includes(character)));
		superArray = superArray.filter(character => character != 0);
		let moviesToUpdate = []
		
		for (let i = 0; i < superArray.length; i++) {
			movies.forEach(function(movie){
				// find movies, excluding none
				if (movie.id != 0 && movie.id == superArray[i]){
					// remove the characters from movies (and none)
					let newCharacters = movie.characters.filter(function(character){
						return character != 0 && character != characterID
					})
					// Modify the characters arrays in movies
					movie.characters = newCharacters
					moviesToUpdate.push(movie)

					// Add movie only to updated
					if (newArray.includes(movie.id)){
						movie.characters.unshift(characterID);
					}

					// fill with none
					if (movie.characters.length < 3) {
						do {
							movie.characters.push(Number(0));
						} while (movie.characters.length < 3);
					}					
				}
			})
		}
		
		// Update DB with modified movies array
		this.updateArray(moviesToUpdate)
	},

}

module.exports = Movie;