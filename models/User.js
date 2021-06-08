const path = require('path');
const fs = require('fs');

const dbUsersPath = path.resolve(__dirname, '../data/users.json');
const usersInDB = () => JSON.parse(fs.readFileSync(dbUsersPath, 'utf-8'));

const User = {

	findAll: function () {
		return usersInDB();
	},

	findByPk: function (id) {
		let userFound = this.findAll().find(user => user.id == id);
		return movieFound;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(user => user[field] == text);
		return userFound;
	},

}

module.exports = User;