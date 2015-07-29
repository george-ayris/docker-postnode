var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

console.log(process.env.INCREMENT);

var client = redis.createClient('6379', 'redis');

app.post('/postnode', function(req, res, next) {
  client.incrby('counter', process.env.INCREMENT, function(err, counter) {
    if(err) return next(err);
    res.send('Incremented counter to ' + counter + '\n.');
  });
});

app.get('/postnode', function(req, res, next) {
    res.send('No get function here!\n');
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});