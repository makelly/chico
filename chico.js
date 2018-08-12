// Mock web server

const express = require('express');

const port = 80;

var server = express();


server.put('/Bundle/*', (req, res) => {
  console.log('***** HealthShare Publication *****')
  console.log(req.headers);
  console.log(req.body);
  res.send('Hello');
  res.status(200).end();
});

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});
