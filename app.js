'use strict'

const express = require('express');
const app = express();
const jsonParser = require('body-parser').json;

app.use(function(req, res, next){
    console.log('The leaves on the trees are', req.query.color);
    next();
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Express server is listening on port: ' + port);
});