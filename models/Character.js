const path = require('path');
const fs = require('fs');

const dbCharactersPath = path.resolve(__dirname, '../data/characters.json');
const charactersInDB = () => JSON.parse(fs.readFileSync(dbCharactersPath, 'utf-8'));

const Character = {

	findAll: function () {
		return charactersInDB();
	},

	findByPk: function (id) {
		let characterFound = this.findAll().find(oneCharacter => oneCharacter.id == id);
		return characterFound;
	},

	findByField: function (field, text) {
		let allCharacters = this.findAll();
		let characterFound = allCharacters.find(oneCharacter => oneCharacter[field] === text);
		return characterFound;
	},

	create: function (newCharacter) {
		let allCharacters = this.findAll();
	
		let searchCharacter = this.findByField('name', newCharacter.name) // First, we check if the character already exists.
		if (searchCharacter == undefined) {

			allCharacters.push(newCharacter);
			let uploadCharacters = JSON.stringify(allCharacters, null , 2);
			fs.writeFileSync(dbCharactersPath, uploadCharacters)

			// return 'New character created'

		} else {
			let filePath = path.resolve(__dirname,'../public/images/characters/' + newCharacter.characterImage);
			fs.unlinkSync(filePath);

		}	
	},


	deleteImage: function (image) {
		let imagePath = path.resolve(__dirname,'../public/images/characters/' + image);
		fs.unlinkSync(imagePath);
	},


	updateDB: function (array) {
		let uploadCharacters = JSON.stringify(array, null , 2);
		fs.writeFileSync(dbCharactersPath, uploadCharacters)	
	}

}

module.exports = Character;