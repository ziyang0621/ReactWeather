var express = require('express');
var path = require('path');

// Create our app
var app = express();
var router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

router.get('/*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use('/', router);

app.listen(port, function () {
  console.log('Express sever is up on port ' + port);
});
