const path = require('path');
const fs = require('fs');

const dbGenresPath = path.resolve(__dirname, '../data/genres.json');
const genresInDB = () => JSON.parse(fs.readFileSync(dbGenresPath, 'utf-8'));

const Genre = {

	findAll: function () {
		return genresInDB();
	},

	findByPk: function (id) {
		let allGenres = this.findAll();
		let genreFound = allGenres.find(oneGenre => oneGenre.id === id);
		return genreFound;
	},

	findByField: function (field, text) {
		let allGenres = this.findAll();
		let genreFound = allGenres.find(oneGenre => oneGenre[field] === text);
		return genreFound;
	},
}

module.exports = Genre;