const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	password: {
		type: String,
		minLength: 8,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
});

const User = mongoose.model("users", userSchema);

module.exports = {
	User,
};
