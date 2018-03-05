'use strict'
const express = require('express');
const app = express();
const routes = require('./routes');

const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require("mongoose");

mongoose.connect("mongobd://localhost:27017/qa");

var db = mongoose.connection;

db.once("open", function(){
	console.log("DB CONNECTION SUCCESSFUL!");
});

app.use('/questions', routes);

// catch 404 amd forward to error handler
app.use(function(req, res, next){
	let err = new Error('Not found');
	err.status = 404;
	return next(err);
});

// error handler
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.json({
		error: err.message
	});
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('EXPRESS SERVER LISTENING ON PORT: ' + port);
});