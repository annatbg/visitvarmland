const serverless = require("serverless-http");
const express = require("express");
const app = express();
app.use(express.json());

// Import controllers (endpoint logic)
const userController = require("./controllers/user/userController");
const notFoundController = require("./controllers/notFoundController");
const demandController = require("./controllers/demand/demandController");

// CORS Middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or set to your frontend's origin like 'http://localhost:5175'
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Send a 200 response for preflight requests
  }
  next();
});

// Routes
app.post("/signup", userController.signupUser);
app.post("/login", userController.loginUser);
<<<<<<< HEAD
app.post("/demand", demandController.createDemand);
=======
app.post("/user/fetch", userController.fetchUser);
>>>>>>> 730453932f197898bc916cabfcd6fab718ca8a1a

// Catch-all for 404 errors
app.use(notFoundController.error);

exports.handler = serverless(app);
