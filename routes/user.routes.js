// import the express module
const express = require("express");
// import the router method from express to create the router
const router = express.Router();
// import the user controller
const userController = require("../controllers/user.controller");
// create a route to handle the register request on post
router.post("/api/register", userController.createUser);

// export the router
module.exports = router;
