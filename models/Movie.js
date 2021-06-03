const path = require('path');
const fs = require('fs');

const dbMoviesPath = path.resolve(__dirname, '../data/movies.json');
const moviesInDB = () => JSON.parse(fs.readFileSync(dbMoviesPath, 'utf-8'));

const Movie = {

	findAll: function () {
		return moviesInDB();
	},

	findByPk: function (id) {
		let allMovies = this.findAll();
		let movieFound = allMovies.find(oneMovie => oneMovie.id === id);
		return movieFound;
	},

	findByField: function (field, text) {
		let allMovies = this.findAll();
		let movieFound = allMovies.find(oneMovie => oneMovie[field] === text);
		return movieFound;
	},
}

module.exports = Movie;