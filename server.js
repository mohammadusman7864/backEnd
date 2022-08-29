 if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");

const user = require("./routes/user");
const connection = require("./database/db");

const app = express();

app.use(
	cors({
		exposedHeaders: ["x-auth-token"],
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", user);

app.listen(process.env.PORT, () => {
	console.log(`server is running at ${process.env.PORT}`);
});

connection();
