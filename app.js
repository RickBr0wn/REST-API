'use strict'

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;
const routes = require('./routes');

app.use(jsonParser());

app.use('/questions', routes);

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Express server is listening on port: ' + port);
});