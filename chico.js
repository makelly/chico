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
  console.log('** HealthShare Publication Received **'.yellow.inverse);
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
  res.send('Thank you');
  res.status(200).end();
});

server.listen(config.port, () => {
  console.log('Chico server is up on port ' + config.port);
});

// Load config
function loadConfig()
{
  // Set config to default values
  let config = { port: 80, healthshare: { showMethod: true, showURL: true, showHeaders: true, showBody: true},
                mesh: { },
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
