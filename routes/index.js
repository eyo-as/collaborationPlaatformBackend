// import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// import the user routes
const userRouter = require("./user.routes");
// import the question routes
const questionRouter = require("./question.routes");
// import the answer routes
const answerRouter = require("./answer.routes");
// import the vote routes
const voteRouter = require("./vote.routes");
// Add the user routes to the main router
router.use(userRouter);
// Add the question routes to the main router
router.use(questionRouter);
// Add the answer routes to the main router
router.use(answerRouter);
// Add the vote routes to the main router
router.use(voteRouter);
// export the router
module.exports = router;
