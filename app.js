'use strict'

const express = require('express');
const app = express();

app.use(function(req, res, next){
    console.log('First piece of middleware!');
    next();
});

app.use(function(req, res, next){
    console.log('Second piece of middleware!');
    next();
});

const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Express server is listening on port: ' + port);
});