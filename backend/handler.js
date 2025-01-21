const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.use(express.json());

// controllers
const userController = require("./controllers/user/userController");
const notFoundHandler = require("./controllers/notFound");

// routes
app.post("/login", userController.loginUser);
app.use(notFoundHandler);

// Export the app wrapped with serverless
module.exports.handler = serverless(app);
