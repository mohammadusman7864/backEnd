const mongoose = require("mongoose");

const connection = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("connected to database");
	} catch (e) {
		console.log(e);
	}
};

module.exports = connection;
