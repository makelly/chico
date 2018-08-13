# Chico
Chico is a mock server to:
* Receive event publications as an InterSystems HealthShare EMS
* Receive event publications as MESH
* Receive pointers as NRLS

## Installation
This is a Node application, therefore you need to first install [Node](https://nodejs.org/en/) on your computer.

Next clone or download the application code into a directory.

From the command-line move to the directory and run:

`npm install`

## Usage
Start the server by:

**`node chico.js`**

You will then see:

`Chico server is up on port 80`

Chico will continue to listen for incoming HTTP requests until you terminate it by `CTRL C`.

## Configuration
Configuration of Chico is defined by values in the configuration file:

`config/chico.json`

The following configuration items can be set:

| Item | Description | Data type | Default |
|------|-------------|-----------|---------|
| `port` | The port number on which Chico will listen for incoming HTTP requests. | number | `80` |
| `healthshare.showMethod` | Show HTTP request method. | boolean | `true` |
| `healthshare.showURL` | Show HTTP request URL. | boolean | `true` |
| `healthshare.showHeaders` | Show HTTP request headers. | boolean | `true` |
|  `healthshare.showBody` | Show HTTP body. | boolean | `true` |

Example configuration `chico.json` file:
```
{
  "port": 3000,
  "healthshare": {
    "showMethod": true,
    "showURL": true,
    "showHeaders": true,
    "showBody": false
  },
  "mesh": {

  },
  "nrls": {

  }
}
```
