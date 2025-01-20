const express = require("express");
const { sayHello } = require("./hello.controller");

const router = express.Router();

// Define routes for "hello"
router.get("/", sayHello);

module.exports = router;
