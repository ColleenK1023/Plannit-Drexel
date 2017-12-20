var express = require('express');
var terms = require('./terms');
var year = require('./getTerm');

var app = express();

// Declare routes
app.get('/terms', terms.list);
app.get('/courses', year.yearSearch);

// Start app
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Listening on port " + port);
