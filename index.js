var express = require("express");
var app = express();

console.log('Starting Trajectory Web Server ...');

app.use(express.static('.'));
var server = app.listen(3000);