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

	create: function (genre) {
		let allGenres = this.findAll();
	
		let searchGenre = this.findByField('name', genre) // First, we check if the genre already exists.
		if (searchGenre == undefined) {
			let lastElement = allGenres[allGenres.length -1];
			let lastID = lastElement.id;
			let nextID = lastID + 1;

			let newGenre = {
				id: nextID,
				name: genre
			}

			allGenres.push(newGenre);
			let uploadGenres = JSON.stringify(allGenres, null , 2);
			fs.writeFileSync(dbGenresPath, uploadGenres)

			return nextID
		} else {

			let genreID = searchGenre.id
			
			return genreID;
		}	
	}
}

module.exports = Genre;