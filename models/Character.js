const path = require('path');
const fs = require('fs');

const dbCharactersPath = path.resolve(__dirname, '../data/characters.json');
const charactersInDB = () => JSON.parse(fs.readFileSync(dbCharactersPath, 'utf-8'));

const Character = {

	findAll: function () {
		return charactersInDB();
	},

	findByPk: function (id) {
		let allCharacters = this.findAll();
		let characterFound = allCharacters.find(oneCharacter => oneCharacter.id === id);
		return characterFound;
	},

	findByField: function (field, text) {
		let allCharacters = this.findAll();
		let characterFound = allCharacters.find(oneCharacter => oneCharacter[field] === text);
		return characterFound;
	},
}

module.exports = Character;