//require the express nodejs module
// import * as firebase from 'firebase';

var firebase = require('firebase'),

    express = require('express'),
    //set an instance of exress
    app = express(),
    //require the body-parser nodejs module
    bodyParser = require('body-parser'),
    //require the path nodejs module
    path = require("path"),


    config = {
        apiKey: "AIzaSyD6jFXalt-AXrK0JsiHHp9MuxumTSXUZ_M",
        authDomain: "awesome-flash-99616.firebaseapp.com",
        databaseURL: "https://awesome-flash-99616.firebaseio.com",
        projectId: "awesome-flash-99616",
        storageBucket: "awesome-flash-99616.appspot.com",
        messagingSenderId: "64543180480"
    },
    name;

firebase.initializeApp(config);

let getFireName = (callback) => {
    /* Code for reading from  firebase database */

    console.log('inside getFireName');
    return firebase.database().ref('/').on('value', callback);

    /* Code for loadeing data once which isn't expected to change frequently */
    // firebase.database().ref('/').once('value').then(function(snapshot) {

    //     snapshot.forEach(function(childSnapshot) {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log('childData=' + childData); // ...
    //         // ...
    //     });

    // });

    /* Code for wrtiting to firebase database */

    // firebase.database().ref('/').set({
    //     name: 'abhijeeet'
    // });
}

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /form route is requested
app.post('/fulfillment', function(req, res) {
    var resultVal = {};
    res.setHeader('Content-Type', 'application/json');

    switch (req.body.result.action) {

        case 'portfolio':
            resultVal = processPortfolioRequest(req.body.result.parameters, res);
            break;
        case 'history':
            resultVal = processHistoryRequest(req.body.result.parameters, res);
            break;
        case 'account':
            resultVal = processAccountRequest(req.body.result.parameters, res);
            break;
        case 'faq':
            resultVal = processFaqRequest(req.body.result.parameters, res);
            break;
        default:

            console.log('No intents matched');
    }

    // res.send(JSON.stringify(resultVal));

    //debugging output for the terminal
    console.log('request is : ', req.body.result.action, req.body.result.parameters);
});

function processPortfolioRequest(data, res) {
    var result = {
        "speech": "Portfolio is returned from services",
        "displayText": "Portfolio is returned from services",
        "data": JSON.stringify(data),
        "contextOut": [],
        "source": "Portfolio Service"
    };
    return result;
}

function processHistoryRequest(data, res) {

    console.log('inside history');
    var callback = function(snapshot) {

        var datareturn = {
            'name': '',
            'portfolioName': 'Advisory Portfolio',
            'assetAmount': '2000 Euro'
        };

        snapshot.forEach(function(childSnapshot) {
            console.log('name =' + childSnapshot.val());
            datareturn.name = childSnapshot.val();
        });

        var result = {
            "speech": datareturn.name + " Portfolio History is returned from services",
            "displayText": "Portfolio History is returned from services",
            "data": JSON.stringify(datareturn),
            "contextOut": [],
            "source": "Portfolio History Service"
        };
        console.log(result);

        res.send(JSON.stringify(result));
    };


    return getFireName(callback);


}

function processAccountRequest(data, res) {
    var result = {
        "speech": "Portfolio account is returned from services",
        "displayText": "Portfolio account is returned from services",
        "data": JSON.stringify(data),
        "contextOut": [],
        "source": "Portfolio account Service"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processFaqRequest(data, res) {

    var datareturn = {
        'botname': 'goku',
        'features': ['portfolio', 'virtual credit card', 'questions', 'incident requests'],
        'whatelse': 'I am working on more functionality'
    };


    var result = {
        "speech": "Portfolio FAQ is returned from services",
        "displayText": "Portfolio FAQ is returned from services",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio FAQ Service"
    };

    console.log(result);

    res.send(JSON.stringify(result));

    return result;
}
//wait for a connection
app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running. Point your browser to: http://localhost:3000');
});