// Mock web server

const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const jsonSchema = require('jsonschema');
const fs = require('fs');
const path = require('path');

//const PORT = 80;
const CONFIG_FOLDER = 'config';
const CONFIG_FILENAME = 'chico.json';
const FILE_ENCODING = 'utf8';

const server = express();
server.use(bodyParser.text({ type: ['application/json+fhir', 'application/xml+fhir'] }));
const config = loadConfig();

// Listen for publications sent to HealthShare EMS
server.put('/ems/fhir/Bundle/*', (req, res) => {
  console.log(' ');
  console.log('** HealthShare Received Event **'.yellow.inverse);
  if (config.healthshare.showMethod) {
    console.log('HTTP Method:'.yellow);
    console.log(req.method);
  }
  if (config.healthshare.showURL) {
    console.log('HTTP URL:'.yellow);
    console.log(req.protocol + '://' + req.hostname + req.originalUrl);
  }
  if (config.healthshare.showHeaders) {
    console.log('HTTP Headers:'.yellow);
    console.log(req.headers);
  }
  if (config.healthshare.showBody) {
    console.log('HTTP Body:'.yellow);
    console.log(req.body);
  }
  let vid = '123456789';
  res.setHeader('content-location', req.protocol + '://' + req.hostname + req.originalUrl + '/_history/' + vid);
  res.setHeader('Etag', 'W/"' + vid + '"');
  res.send('Response from Chico');
  res.status(200).end();
});

// Listen for publications sent to MESH
server.post('/messageexchange/*', (req, res) => {
  console.log(' ');
  console.log('** MESH Received Event **'.yellow.inverse);
  if (config.mesh.showMethod) {
    console.log('HTTP Method:'.yellow);
    console.log(req.method);
  }
  if (config.mesh.showURL) {
    console.log('HTTP URL:'.yellow);
    console.log(req.protocol + '://' + req.hostname + req.originalUrl);
  }
  if (config.mesh.showHeaders) {
    console.log('HTTP Headers:'.yellow);
    console.log(req.headers);
  }
  if (config.mesh.showBody) {
    console.log('HTTP Body:'.yellow);
    console.log(req.body);
  }
  res.status(202);
  res.send('{"messageID" : 1234567890}').end();
});

server.listen(config.port, () => {
  console.log('Chico server is up on port ' + config.port);
});

// Load config
function loadConfig()
{
  // Set config to default values
  let config = {
                port: 80,
                healthshare: { showMethod: true, showURL: true, showHeaders: true, showBody: true },
                mesh: { showMethod: true, showURL: true, showHeaders: true, showBody: true },
                nrls: {}
              };

  try {
    // read the config file
    config = JSON.parse(fs.readFileSync(path.join(__dirname, './', CONFIG_FOLDER, CONFIG_FILENAME), FILE_ENCODING));
  } catch(e) {
    // If there is a problem just use the defaults
    console.log('Error reading config file, therefore default values will be used.');
  }

  return config;
}
