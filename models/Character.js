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
	},


	updateArray: function(array){
		let allCharacters = this.findAll();

        for (let i = 0; i < array.length; i++){
            allCharacters = allCharacters.map(function(character){
                if (character.id == array[i].id){
                    character = array[i]
                }
                return character
            })
        }
		this.updateDB(allCharacters)
	},


	replace: function (updatedCharacter) {
		let characcters = this.findAll()
		let newCharacterDB = characcters.map(function(character){

            if (character.id == updatedCharacter.id){
                character = updatedCharacter
            }
            return character
        })
		this.updateDB(newCharacterDB)
	},


	// update movies array when modified from character
	movieUpdated: function (movieID, dbArray, newArray) {
		let characters = this.findAll()

		// All characters to be modified
		let superArray = dbArray.concat(newArray.filter(movie => !dbArray.includes(movie)));
		superArray = superArray.filter(movie => movie != 0);
		let charactersToUpdate = []
		
		for (let i = 0; i < superArray.length; i++) {
			characters.forEach(function(character){
				// find characters, excluding none
				if (character.id != 0 && character.id == superArray[i]){
					// remove the movie from characters (and none)
					let newMovies = character.movies.filter(function(movie){
						return movie != 0 && movie != movieID
					})
					// Modify the movies array in characters
					character.movies = newMovies
					charactersToUpdate.push(character)

					// Add movie only to updated
					if (newArray.includes(character.id)){
						character.movies.unshift(movieID);
					}

					// fill with none
					if (character.movies.length < 5) {
						do {
							character.movies.push(Number(0));
						} while (character.movies.length < 5);
					}					
				}
			})
		}
		
		// Update DB with modified characters array
		this.updateArray(charactersToUpdate)
	},


}

module.exports = Character;