//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path")
	// ,
	// processGreetingsRequest = require("./greetings");
	
//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /form route is requested
app.post('/form',function(req, res){
	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify({
		firstName: req.body.firstName || null,
		lastName: req.body.lastName || null
	}));

	//debugging output for the terminal
	console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
});


//wait for a connection
app.listen(4000, function () {
  console.log('Server is running. Point your browser to: http://localhost:80');
});
//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");
	
//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /form route is requested
app.post('/fulfillment',function(req, res){
	var resultVal = {};
	res.setHeader('Content-Type', 'application/json');

		switch(req.body.result.action){

			case 'portfolio': 
				resultVal = processPortfolioRequest(req.body.result.parameters);
				break;
			case 'history':
				resultVal = processHistoryRequest(req.body.result.parameters);
				break;
			case 'account':
				resultVal = processAccountRequest(req.body.result.parameters);
				break;
			case 'faq':
				resultVal = processFaqRequest(req.body.result.parameters);
				break;
			default:

			console.log(req.body.result);
			console.log(req.body.result.parameters);
			console.log('No intents matched');
		}

		res.send(JSON.stringify(resultVal));

	//debugging output for the terminal
	console.log('request is : ', req.body.result.action, req.body.result.parameters);
});

function processPortfolioRequest(data) {
	var result = {
		"speech": "BusBook Service Fulfilled",
		"displayText": "BusBook Service Fulfilled",
		"data": data,
		"contextOut": [],
		"source": "Greetings Service"
		};
	return result;
}

function processHistoryRequest(data) {
	var result = {
		"speech": "BusBook Service Fulfilled",
		"displayText": "BusBook Service Fulfilled",
		"data": data,
		"contextOut": [],
		"source": "Greetings Service"
		};
	return result;
}

function processAccountRequest(data) {
	var result = {
		"speech": "BusBook Service Fulfilled",
		"displayText": "BusBook Service Fulfilled",
		"data": data,
		"contextOut": [],
		"source": "Greetings Service"
		};
	return result;
}

function processFaqRequest(data) {
	var result = {
		"speech": "BusBook Service Fulfilled",
		"displayText": "BusBook Service Fulfilled",
		"data": data,
		"contextOut": [],
		"source": "Greetings Service"
		};
	return result;
}
//wait for a connection
app.listen(4000, function () {
  console.log('Server is running. Point your browser to: http://localhost:80');
});