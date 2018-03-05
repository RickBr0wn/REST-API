'use strict'
const express = require('express');
const router = express.Router();
var Question = require('./models').Question;

// GET /questions
// Return all the questions
router.get("/", function (req, res) {
	Question.find({}, function(err, questions){
		
	});
	res.json({
		response: "You sent me a GET request"
	});
});

// POST /questions
// Route for creating questions
router.post("/", function (req, res) {
	res.json({
		response: "You sent me a POST request",
		body: req.body
	});
});

// GET /questions/:qID
// Route for specific questions
router.get("/:qID", function (req, res) {
	res.json({
		response: "You sent me a GET request for qID " + req.params.qID
	});
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post("/:qID/answers", function (req, res) {
	res.json({
		response: "You sent me a POST request to /answers",
		questionID: req.params.qID,
		body: req.body
	});
});

// PUT /questions/:qID/answers
// Edit a specific answer
router.put('/:qID/answers/:aID', function (req, res) {
	res.json({
		response: "You sent me a PUT request to /answers",
		questionID: req.params.qID,
		answerID: req.params.aID,
		body: req.body
	});
});

// DELETE /questions/:qID/answers
// Delete a specific answer
router.delete('/:qID/answers/:aID', function (req, res) {
	res.json({
		response: "You sent me a DELETE request to /answers",
		questionID: req.params.qID,
		answerID: req.params.aID
	});
});

// POST /questions/:qID/answers/vote-up
// POST /questions/:qID/answers/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', function (req, res, next) {
		if (req.params.dir.search(/^(up|down)$/) === -1) {
			let err = new Error('Not Found');
			err.status = 404;
			return next(err);
		} else {
			next();
		}
	},
	function (req, res) {
		res.json({
			response: "You sent me a POST request to /vote-" + req.params.dir,
			questionID: req.params.qID,
			answerID: req.params.aID,
			vote: req.params.dir
		});
	});

module.exports = router;