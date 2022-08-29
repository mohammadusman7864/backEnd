const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
	const { password, username } = req.body;
	if (!username)
		return res.status(400).json({ message: "username is required" });
	if (password?.length < 8 || password?.length > 16)
		return res.status(400).json({ message: "password is too short or long" });
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await User.create({ username, password: hashedPassword });
		const token = jwt.sign({ username }, process.env.SECRET_KEY);
		res.status(201).header("x-auth-token", token).send(user.username);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
});

router.post("/login", async (req, res) => {
	const { password, username } = req.body;
	if (!username)
		return res.status(400).json({ message: "username is required" });
	if (password?.length < 8 || password?.length > 16)
		return res.status(400).json({ message: "password is too short or long" });
	try {
		const user = await User.findOne({ username });
		console.log(user.password);
		const isAuthenticated = await bcrypt.compare(password, user.password);
		console.log(isAuthenticated);
		if (!isAuthenticated)
			return res.status(400).json({ message: "password is not match" });
		const token = jwt.sign({ username }, process.env.SECRET_KEY);
		res.status(201).header("x-auth-token", token).send(user.username);
	} catch (e) {
		res.status(400).json({ message: "user is not exists" });
	}
});

router.post("/me", async (req, res) => {
	console.log("token");
	const { token } = req.body;
	console.log(token);
	if (!token) return res.status(404).send("token is not provided");
	try {
		var decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findOne({ username: decoded.username });
		res.send(user.username);
	} catch (e) {
		res.status(401).send("token is not valid");
	}
});

module.exports = router;
