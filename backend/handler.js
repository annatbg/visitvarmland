// handler.js
const express = require("express");
const serverless = require("serverless-http");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import modular routes
const helloRoutes = require("./functions/hello");

// Use the routes
app.use("/hello", helloRoutes);

// Export the app wrapped with serverless
module.exports.handler = serverless(app);
