/**
 * Create express app on port 3000
 */
var express = require('express'),
    app = express(),
    port = 3000;

    // serve angular.js logic
    app.use(express.static(__dirname + '/client'));


app.listen(port);
console.log('Listening on port ' + port);