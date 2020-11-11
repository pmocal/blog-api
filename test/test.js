// const posts = require("../routes/posts.js");
// const request = require("supertest");
const superagent = require("superagent");
// const express = require("express");
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use("/posts", posts);

superagent
	.get("http://localhost:3000/posts/")
	.then(res => {

		assert.equal(200, res.status);
	});