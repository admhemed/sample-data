var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./key.pem', 'utf8');
var certificate = fs.readFileSync('./cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var grab = require('ps-grab');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = grab('port') || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
console.log('oioio');

router.get('/', function(req, res) {
    res.json({ voice: 2500000, sms: 5300000, data: 240000000 });   
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
console.log('Magic happens on port ' + port);
